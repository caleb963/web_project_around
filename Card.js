export class Card {
  constructor(title, link, template) {
    this.title = title;
    this.link = link;
    this.template = document.querySelector(template);

  }
    _getCardClone() {
      const card = this.template.content.querySelector(".card").cloneNode(true);
      return card;
    }
    _handleLike (event){
      event.target.classList.toggle("card__like_active");
    }
    _handleDislike (event) {
      event.target.classList.toggle("card__dislike_active");
    }
    _handleSetLike(event) {
      event.target.classList.add("card__like_active");
    }
    _handleRemoveCard(event) {
      event.target.closest(".card").remove();
    }
    _handleOpenImageCard(card) {
      const cardImage = card.querySelector(".card__image");
      openImage(this.title, cardImage.src);
    }
    _setProperties(card) {
      const cardImage = card.querySelector(".card__image");
      const cardTitle = card.querySelector(".card__title");

      cardImage.src = this.link;
      cardImage.alt = `Image of ${this.title}`;
      cardTitle.textContent = this.title;
    }
    _setEventListeners(card) {
      const likeButton = card.querySelector(".card__like");
      const deleteButton = card.querySelector(".card__delete");
      const cardImage = card.querySelector(".card__image");

      likeButton.addEventListener("click", this._handleLike.bind(this));
      deleteButton.addEventListener("click", this._handleRemoveCard.bind(this));
      cardImage.addEventListener("click", () => this._handleOpenImageCard(card));
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