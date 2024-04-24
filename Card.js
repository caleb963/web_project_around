export default class Card {
  constructor(title, link, template){
    this.title = title;
    this.link = link;
    this.template = template;

    this._handleLike = this._handleLike.bind(this);
    this._handleRemoveCard = this._handleRemoveCard.bind(this);
    this._handleOpenImageCard = this._handleOpenImageCard.bind(this);
  }

  _getCardClone(){
   this.card = this.template.content.querySelector(".elements__card").cloneNode(true);
  }

  _handleLike = () => {
    const likeButton = this.card.querySelector(".elements__card-heart");
    likeButton.classList.toggle("elements__card-heart_active");
  }

  _handleRemoveCard = () =>{
    this.card.remove();
  }
  _handleOpenImageCard = () => {
    const cardImage = this.card.querySelector(".elements__card-image");
    _handleOpenImageCard(this.title, cardImage.src);
  }

  _setProperties(){
    this.card.querySelector(".elements__card-title").textContent = this.title;
    const cardImage = this.card.querySelector(".elements__card-image");
    cardImage.src = this.link;
    cardImage.alt = this.title;
  }
   setEventListeners(){
    this.card.querySelector(".elements__card-heart").addEventListener("click", this._handleLike);
    this.card.querySelector(".elements__card-delete").addEventListener("click", this._handleRemoveCard);
    this.card.querySelector(".elements__card-image").addEventListener("click", () => this._handleOpenImageCard(this.title, this.link));
   }

   generateCard(){
    this._getCardClone();
    this._setProperties();
    this.setEventListeners();
    return this.card;
   }
}