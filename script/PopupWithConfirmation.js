import {Popup} from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__confirmation-content");
  }

  setEventListeners() {
    const buttonForm = this._form.querySelector("#delete-card-submit");
    super.setEventListeners();
    buttonForm.addEventListener("click", () => {
      this._handleFormSubmit(this._cardElement, this._cardId);
    });
   }

  open(cardElement, cardId) {
    this._cardElement = cardElement;
    this._cardId = cardId;
    super.open();
  }


  }
