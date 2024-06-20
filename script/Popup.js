export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    if(this._popupElement === null) {
      throw new Error("No popup element found");
    }
    this.popupCloseButton = this._popupElement.querySelector(".popup__close-button");
  this._handleEscClose = this._handleEscClose.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  open() {
    this._popupElement.classList.add("popup__opener");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popupElement.classList.remove("popup__opener");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if(evt.key === "Escape") {
      this.close();
    }
  }
    _isClickOutside(evt) {
      return evt.target.classlist.contains("popup__opener");
    }
    setEventListeners() {
      this.popupCloseButton.addEventListener("click", () => {
        this.close();
      });
      this._popupElement.addEventListener("click", () => {
        if(this._isClickOutside) {
          this.close();
        }
      });
    }
  }