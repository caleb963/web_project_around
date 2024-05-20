import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.form = document .querySelector(".popup__edit-form")
  }
  _getInputValues() {
    const inputs = this.popupElement.querySelectorAll(".popup__input");
    const inputValues = {};
      inputs.forEach(input => {
        inputValues[input.name] = input.value;
      });
      return inputValues;
    }

  setEventListeners() {
    super.setEventListeners();
    this.popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit()
      const inputValues = this._getInputValues();
      this.handleFormSubmit(inputValues);
    });
  }
  close() {
    super.close();
    this.form.reset();
  }
}

