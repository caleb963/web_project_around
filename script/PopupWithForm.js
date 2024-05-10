import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.submitButton = super.popupElement.querySelector("#addcard-submit");
  }
  _getInputValues() {}
  setEventListeners() {
    super.setEventListeners();
  }
}

const addCardPopup = new PopupWithForm(() => {}, "#popup-add-card");

addCardPopup.setEventListeners();