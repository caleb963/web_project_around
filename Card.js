export default class Card {
  constructor(title, link, template){
    this.title = title;
    this.link = link;
    this.template = template;
  }

  _getCardClone(){
    this.card = this.template.cloneNode(true).content.querySelector(".card");
  }

  _handleLike(){}
  _handleDislike(){}
  _handleSetLike(){}
  _handleRemoveCard(){}
  _handleOpenImageCard(){}

  _setProperties(){
    this.card.querySelector(".card__title").textContent = this.title;
    const cardImage = this.card.querySelector(".card__image");
    cardImage.src = this.link;
    cardImage.alt = this.title;
  }
   setEventListeners(){
    this.card.querySelector(".card__like-button").addEventListener("click", this._handleLike);
    this.card.querySelector(".card__dislike-button").addEventListener("click", this._handleDislike);
    this.card.querySelector(".card__delete-button").addEventListener("click", this._handleRemoveCard);
    this.card.querySelector(".card__image").addEventListener("click", this._handleOpenImageCard);
   }

   generateCard(){
    this._getCardClone();
    this._setProperties();
    this.setEventListeners();
    return this.card;
   }
}