import { PopupWithImage } from "./PopupWithImage.js";



export default class Card {
  constructor({title, link,likes, _id, userId}, template, handleCardClick){
    this.title = title;
    this.link = link;
    this.likes = likes;
    this._id = _id;
    this.userId = userId;
    this.template = template;
    this.handleCardClick = handleCardClick;


    this._handleLike = this._handleLike.bind(this);
    this._handleRemoveCard = this._handleRemoveCard.bind(this);
    this._handleOpenImageCard = this._handleOpenImageCard.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
  }

  toggleLike() {
    const likeButton = this.card.querySelector(".elements__card-heart");
    likeButton.classList.toggle("elements__card-heart_active");
    this.handleCardClick(this._id, this.userId);
    this._handleLike();
  }

  _getCardClone(){
   this.card = this.template.content.querySelector(".elements__card").cloneNode(true);
  }




  _handleLike = () => {

   const likeButton = this.card.querySelector(".elements__card-heart");
    likeButton.classList.toggle("elements__card-heart_active");
    this.toggleLike(this._id, this.userId);
  }

  _handleRemoveCard = () =>{
    this.card.remove();
  }

  _handleOpenImageCard = () => {
    const cardImage = this.card.querySelector(".elements__card-image");
    const PopupWithImageCard = new PopupWithImage("#popup-show-picture");
    cardImage.addEventListener("click", () => {
      PopupWithImageCard.open(this.title, this.link);
    })

  }

  _setProperties(){
    this.card.querySelector(".elements__card-title").textContent = this.title;
    const cardImage = this.card.querySelector(".elements__card-image");
    cardImage.src = this.link;
    cardImage.alt = this.title;

    const likeCount = this.card.querySelector(".elements__card-like-count");
    likeCount.textContent = this.likes.length; // show the numbre of likes
  }

   setEventListeners() {
    this.card.querySelector(".elements__card-heart").addEventListener("click", this._handleLike);
    this.card.querySelector(".elements__card-delete").addEventListener("click", this._handleRemoveCard);
    this.card.querySelector(".elements__card-image").addEventListener("click", () => { this._handleOpenImageCard(this.title, this.link);
   });
   }

   generateCard(){
    this._getCardClone();
    this._setProperties();
    this.setEventListeners();
    return this.card;
   }
}