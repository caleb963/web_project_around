import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    const inputs = this.popupElement.querySelectorAll("input");
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
}

const addCardPopup = new PopupWithForm(() => {
  console.log(inputValues);
}, "#popup-add-card");

addCardPopup.setEventListeners();