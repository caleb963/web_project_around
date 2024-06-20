import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this.image = this._popupElement.querySelector(".popup__image");
    this.caption = this._popupElement.querySelector(".popup__image-title");
  }

  open(title, link) {
    this.image.src = link;
    this.image.alt = title;
    this.caption.textContent = title;
    super.open();
  }
}