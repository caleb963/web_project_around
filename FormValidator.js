class FormValidator {
  constructor(formElement, settings) {
    this.formElement =formElement;
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
    //logic to show error message
  }
  _hideInputError(inputElement) {
    //logic to remove error message
  }
  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid){
    this._showInputError();
    }else{
      this._hideInputError();
    }
  }
  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState(){
    if(this._hasInvalidInput()){
      this.buttonElement.classList.add(this.inactiveButtonClass);
    }else{
      this.buttonElement.classList.remove(this.inactiveButtonClass);
    }
  }
  _setEventListeners() {
    this.formElement.addEventlistener("submit", (evt) => {
      evt.preventDefault();
    })
    this._toggleButtonState();
    this._checkInputValidity();

  }
  enableValidation() {
    this._setEventListeners();
  }


}