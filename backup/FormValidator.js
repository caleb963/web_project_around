export class FormValidator {
  constructor(formElement, settings) {
    this.formElement = formElement;
    this._settings = settings;
    this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
    this.formSelector = settings.formSelector;
    this.inputSelector = settings.inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.errorClass = settings.errorClass;
    this.buttonElement = this.formElement.querySelector(
      settings.submitButtonSelector
    );
    this.inputList = Array.from(
      this.formElement.querySelectorAll(this.inputSelector)
      );
  }




  _showInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = "";
  }
  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid){
    this._showInputError(inputElement);
    }else{
      this._hideInputError(inputElement);
    }
  }
  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState(){
    if(this._hasInvalidInput()){
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.disabled = true;
    }else{
      this.submitButton.classList.remove(this._settings.inactiveButtonClass);
      this.submitButton.disabled = false;
    }
  }
  _setEventListeners() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
     this._toggleButtonState();
  }
  enableValidation() {
    this._setEventListeners();
  }
}