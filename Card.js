class Card {
  constructor(title, link, template) {
    this.title = title;
    this.link = link;
    this.template = document.querySelector(templateSelector);

  }
    _getCardClone() {
      const card = this.template.content.querySelector(".card").cloneNode(true);
      return card;
    }
    _handleLike (event){
      event.target.classList.toggle("card__like_active");
    }
    _handleDislike () {}
    _handleSetLike() {}
    _handleRemoveCard(event) {
      event.target.closest(".card").remove();
    }
    _handleOpenImageCard() {}
    _setProperties() {}
    _setEventListeners(card) {
      const likeButton = card.querySelector(".card__like");
      const deleteButton = card.querySelector(".card__delete");

      likeButton.addEventListener("click", this._handleLike);
      deleteButton.addEventListener("click", this._handleRemoveCard);
    }
    generateCard() {
     const card = this._getCardClone();
     const cardImage = card.querySelector(".card__image");
     const cardTitle = card.querySelector(".card__title");

      cardImage.src = this.link;
      cardImage.alt = this.title;
      cardTitle.textContent = this.title;


    this._setProperties()
    this._setEventListeners(card);

    return card;
    }

}