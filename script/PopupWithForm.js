import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
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

const handleFormSubmit = (inputValues) => {
  console.log(inputValues);
};

const popupWithForm = new PopupWithForm(handleFormSubmit, ".popup__edit-form");

const addCardPopup = new PopupWithForm((inputValues) => {
  console.log(inputValues);
}, "#popup-add-card");

addCardPopup.setEventListeners();
popupWithForm.setEventListeners();

