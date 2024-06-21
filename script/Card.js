import { PopupWithImage } from "./PopupWithImage.js";



export default class Card {
  constructor({title, link, likes, _id, userId}, template, handleCardClick, _toggleLike, handleCardDelete) {
    this.title = title;
    this.link = link;
    this.likes = likes;
    this._id = _id;
    this.userId = userId;
    this.template = template;
    this.handleCardClick = handleCardClick;
    this.handleCardDelete = handleCardDelete;


    this._handleLike = this._handleLike.bind(this);
    this._handleRemoveCard = this._handleRemoveCard.bind(this);
    this._handleOpenImageCard = this._handleOpenImageCard.bind(this);
    this._toggleLike = this.toggleLike.bind(this);
  }



  _getCardClone(){
   this.card = this.template.content.querySelector(".elements__card").cloneNode(true);
  }




  _handleLike = () => {

   const likeButton = this.card.querySelector(".elements__card-heart");
    likeButton.classList.toggle("elements__card-heart_active");
  }

  toggleLike() {
    const likeButton = this.card.querySelector(".elements__card-heart");
    likeButton.classList.toggle("elements__card-heart_active");
    this.handleCardClick(this._id, this.userId);
  }

  _handleRemoveCard = () =>{
    this.handleCardDelete(this.card, this._id); // Llamar the delete function from the main script
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

     //show and hide the trash icon
  const deleteButton = this.card.querySelector(".elements__card-delete");
  if (this.userId !== this.ownerId) {
    deleteButton.remove();
  }
  }



   setEventListeners() {
    this.card.querySelector(".elements__card-heart").addEventListener("click", this._handleLike);
    if (this.userId === this.ownerId) {
      this.card.querySelector(".elements__card-delete").addEventListener("click", this._handleRemoveCard);
    }

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