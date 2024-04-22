export default class FormValidator {
  constructor(formElement, settings) {
    this.formElement = formElement;
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
    // logic to show message error\
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }
  _hideInputError(inputElement) {
    // logic to hide message error
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = "";
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid){
      this._showInputError();
    }else {
      this._hideInputError();
    }
  }
  _hasInvalidInput() {
    // logic to check if input is invalid
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState() {
    // logic to disable button
    if(this._hasInvalidInput()){
      this.buttonElement.classList.add(this.inactiveButtonClass);
    } else {
      this.buttonElement.classList.remove(this.inactiveButtonClass);
    }
  }
  _setEventListeners() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    })
    this._toggleButtonState();
    this._checkInputValidity();
  }
  enableValidation() {
    this._setEventListeners();
  }
}

