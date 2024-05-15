export class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
    this.popupCloseButton = this.popupElement.querySelector(".popup__close-button");
  this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this.popupElement.classList.add("popup__opener");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this.popupElement.classList.remove("popup__opener");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if(evt.key === "Escape") {
      this.close();
    }
  }
    _isClickOutside(evt) {
      return evt.target.classlist.contains("popup_show");
    }
    setEventListeners() {
      this.popupCloseButton.addEventListener("click", () => {
        this.close();
      });
      this.popupElement.addEventListener("click", () => {
        if(this._isClickOutside) {
          this.close();
        }
      });
    }
  }