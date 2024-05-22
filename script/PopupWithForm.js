import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector(".popup__edit-form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  _getInputValues() {
     this._formValues = {};
     this._inputList.forEach(input => this._formValues[input.name] = input.value);
     return this._formValues;
    }

  close() {
    super.close();
    this._form.reset();
  }
}

