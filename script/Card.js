import { PopupWithImage } from "./PopupWithImage.js";



export default class Card {
  constructor({title, link, likes, _id, userId, ownerId}, template, handleCardClick, _toggleLike, handleCardDelete) {
    this.title = title;
    this.link = link;
    this.likes = likes;
    this._id = _id;
    this.userId = userId;
    this.ownerId = ownerId;
    this.template = template;
    this.handleCardClick = handleCardClick;
    this._toggleLike = _toggleLike;
    this.handleCardDelete = handleCardDelete;


    this._handleLike = this._handleLike.bind(this);
    this._handleRemoveCard = this._handleRemoveCard.bind(this);
    this._handleOpenImageCard = this._handleOpenImageCard.bind(this);
  }



  _getCardClone(){
   this.card = this.template.content.querySelector(".elements__card").cloneNode(true);
  }




  _handleLike = () => {
    const isLiked = this.likes.some(user => user._id === this.userId);
    this._toggleLike(this._id, isLiked)
      .then((updatedLikes) => {
        this.likes = updatedLikes;
        this._updateLikesView();
      })
      .catch(err => {
        console.error(`Error toggling like: ${err}`);
      });
  }

  _toggleLike() {
    const likeButton = this.card.querySelector(".elements__card-heart");
    likeButton.classList.toggle("elements__card-heart_active");
    this.handleCardClick(this._id, this.userId);
  }

    _updateLikesView() {
      const likeButton = this.card.querySelector(".elements__card-heart");
      const likeCount = this.card.querySelector(".elements__card-like-count");
      const isLiked = this.likes.some(user => user => user._id === this.userId);

      if (isLiked) {
        likeButton.classList.add("elements__card-heart_active");
      } else {
        likeButton.classList.remove("elements__card-heart_active");
      }

      likeCount.textContent = this.likes.length;
    }

  _handleRemoveCard = () =>{
    this.handleCardDelete(this.card, this._id); // call the delete function from the main script
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

    this._updateLikesView();

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