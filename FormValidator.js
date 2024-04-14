class FormValidator {
  constructor(formElement, settings) {
    this.formElement =formElement;
    this.formSelector = settings.formSelector;
    this.inputSelector = settings.inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.errorClass = settings.errorClass;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(this.inputSelector)
      );
  }
  _showInputError(inputElement) {}
  _hideInputError(inputElement) {}
  _checkInputValidity(inputElement) {}
  _hasInvalidInput() {}
}