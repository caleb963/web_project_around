export default class Card {
  constructor(title, link, template){
    this.title = title;
    this.link = link;
    this.template = template;
  }

  _getCardClone(){
    this.card = this.template.content(true).content.querySelector(".elements__card").cloneNode(true);
  }

  _handleLike = () =>{
    const likeButton = this.card.querySelector(".elements__card-heart");
    likeButton.classList.toggle("elements__card-heart_active");
  }

  _handleDislike = () => {
    const dislikeButton = this.card.querySelector(".elements__card-heart");
    dislikeButton.classList.toggle("elements__card-heart_active");
  }
  _handleSetLike(){}

  _handleRemoveCard = () =>{
    this.card.remove();
  }
  _handleOpenImageCard = () => {
    const cardImage = this.card.querySelector(".card__image");
    this._handleOpenImageCard(this.title, cardImage.src);
  }

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