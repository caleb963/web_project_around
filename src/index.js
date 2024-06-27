import "./styles/index.css";
import Card from "../script/Card.js";
import FormValidator from "../script/FormValidator.js";
import Section from "../script/Section.js";
import {handleOpenProfileForm, handleCloseProfileForm, handleOpenCardForm, handleCloseCardForm , handleOpenImage, handleCloseImage} from "../script/utils.js";
import  PopupWithForm  from "../script/PopupWithForm.js";
import { PopupWithImage } from "../script/PopupWithImage.js";
import PopupWithConfirmation from "../script/PopupWithConfirmation.js";
import { UserInfo } from "../script/UserInfo.js";
import Api from '../script/Api.js';

const buttonProfile = document.querySelector("#profile-edit-button");
const buttonCloseProfile = document.querySelector("#close-profile-form");
const formProfile = document.querySelector("#profile-form");
const formProfileSubmit = document.querySelector("#profile-submit");
const buttonAddCard = document.querySelector("#profile-add-button");
const buttonCloseCard = document.querySelector("#close-addcard-form");
const templateCard = document.querySelector(".template__card");
const cardArea = document.querySelector(".elements");
const formCard = document.querySelector("#addcard-form");
const buttonSubmitCard = document.querySelector("#addcard-submit");
const closeImage = document.querySelector("#close-popup-image");

const avatarEdition = document.querySelector(".profile__avatar-edit-icon");
const avatarPopup = document.querySelector("#popup-update-avatar");
const closeAvatarPopupButton = document.querySelector("#close-update-avatar");
const formAvatar = document.querySelector("#update-avatar-form");
const inputAvatarUrl = document.querySelector("#input-avatar-url");


const groupId = 'web_es_12';
const token = 'cff91bad-a8c7-417a-948a-f02fc6d5768b';
/*const cardsUrl = `https://around.nomoreparties.co/v1/${groupId}/cards`;*/

const api = new Api({
  baseUrl: `https://around.nomoreparties.co/v1/${groupId}`,
  headers: {
    authorization: token,
    'Content-Type' : "application/json"
  }
});

// global variable to store the user Id
let userId;

const sectionCards = new Section({
  items: [], //empty because the cards loads from the server
  renderer: function () {},
}, ".elements");

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about"
});

// define handleCardSubmit before use it
 function handleCardDelete(cardElement,cardId) {
  deleteCardPopup.open(cardElement, cardId);
 }
//Definir handleCardSubmit before use it

function handleDeleteCardSubmit(cardElement, cardId) {
 api.deleteCard(cardId)
 .then(() => {
  cardElement.remove();
  deleteCardPopup.close();
 })
  .catch((err) => {
    console.error(`Error deleting the card: ${err}`);
  });
}

// popup instances
const profilePopup = new PopupWithForm(handleFormSubmit, "#popup-profile");
const addCardPopup = new PopupWithForm(handleAddCardSubmit, "#popup-add-card");
const deleteCardPopup = new PopupWithConfirmation("#popup-delete-card", handleDeleteCardSubmit);
deleteCardPopup.setEventListeners();

function toggleLike(cardId, isLiked) {
 return api.toggleLike(cardId, isLiked)
  .then(data => data.likes)
  .catch(err => {
    console.error(`Error toggling like: ${err}`);
    throw err;
  });
}

// handle card click
const handleCardClick = (title, link) => {
  const popup = document.querySelector("#popup-show-picture");
  const popupImage = popup.querySelector(".popup__image");
  const popupTitle = popup.querySelector(".popup__image-title");

  popupImage.src = link;
  popupImage.alt = title;
  popupTitle.textContent = title;

  popup.classList.add("popup_opener");
}





export function cardGenerator(title, link) {
 const card = templateCard.content.querySelector(".elements__card").cloneNode(true);
  const cardImage = card.querySelector(".elements__card-image");
  const cardTitle = card.querySelector(".elements__card-title");
  const likeButton = card.querySelector(".elements__card-heart");
  const deleteButton = card.querySelector(".elements__card-delete");
  cardImage.src = link;
  cardImage.alt = title;
  cardTitle.textContent = title;
  //Reassigning Events
  likeButton.addEventListener("click", function() {
      likeButton.classList.toggle("elements__card-heart_active");

      return card;
  });
  deleteButton.addEventListener("click", function(){
    card.remove();
  });
  cardImage.addEventListener("click", function(){
    handleCardClick(title, link);
  });

  return card;
}

// function to update user profile on the server
function updateUserProfile(name,about) {
return api.updateUserProfile({name, about });
}



// function to update the user avatar
function updateAvatar(avatarUrl) {
  return api.updateAvatar({ avatar: avatarUrl});
}

// function to add a new card to the server
function  addNewCard(name, link) {
  return api.addCard({name, link});
}


// Form submit handlers
function handleProfileSubmit(evt){
  evt.preventDefault();
  formProfileSubmit.textContent = "Saving...";

  const inputName = document.querySelector("#profile-input-name");
  const inputAbout = document.querySelector("#profile-input-about");

  updateUserProfile(inputName.value, inputAbout.value)
    .then(data => {
      userInfo.setUserInfo({ name: data.name, about: data.about });
      profilePopup.close();
    })
    .catch(error => {
      console.error("Error updating the user profile:", error);
    })
    .finally(() => {
      formProfileSubmit.textContent = "Save";
    });
}

function handleAddCardSubmit(evt){
  evt.preventDefault();
  buttonSubmitCard.textContent = "Saving..."

  const inputCardTitle = document.querySelector("#input-card-title");
  const inputCardLink = document.querySelector("#input-card-url");

const cardTitle = inputCardTitle.value.trim();
const cardLink = inputCardLink.value.trim();

if (!cardTitle || !cardLink) {
  console.error("the card title or link cannot be empty");
  return;
}

  addNewCard(cardTitle, cardLink)
    .then(cardData => {
      const newCard = new Card({
        title:cardData.name,
        link:cardData.link,
        likes:cardData.likes,
        _id: cardData._id,
        userId: userId, //usimg global userId here
        ownerId: cardData.owner._id
      },
        templateCard,
        handleCardClick,
        toggleLike,
        handleCardDelete
      );

      sectionCards.addItem(newCard.generateCard());
      addCardPopup.close();
    })
    .catch(error => {
      console.error(`Error adding the card:`, error);
    })
    .finally(() => {
      buttonSubmitCard.textContent = "Create";
    });
}

function handleFormSubmit(evt,inputValues){
  evt.preventDefault();
  console.log(inputValues);
  userInfo.setUserInfo(inputValues.name, inputValues.about);
  this.close();
}

//function to load initial cards from the server
function loadInitialCards(userId) {
    api.getInitialCards()
    .then(data => {
    data.forEach(cardData => {
      const newCard = new Card({
        title: cardData.name,
        link: cardData.link,
        likes: cardData.likes,
        _id: cardData._id,
        userId: userId, //current user Id
        ownerId: cardData.owner._id //owner of the card Id
      },
      templateCard,
      handleCardClick,
      toggleLike,
      handleCardDelete
    );
      sectionCards.addItem(newCard.generateCard());
    });
  })
  .catch(error => {
    console.error('Error loading the cards:', error);
  });
}


// Fetching initial data
function fetchInitialData() {
   Promise.all([
     api.getUserInfo(),
     api.getInitialCards()
   ])
   .then(([userData, initialCards]) => {
     userId = userData._id;
     userInfo.setUserInfo({
       name: userData.name,
       about: userData.about
     });

     sectionCards.items = initialCards;
     sectionCards._renderer = (cardData) => {
       const card = new Card({
         title:cardData.name,
         link:cardData.link,
         likes:cardData.likes,
         _id: cardData._id,
         userId: userId,
         ownerId: cardData.owner._id,
       }, templateCard, handleCardClick, toggleLike, handleCardDelete);
       const cardElement = card.generateCard();
       sectionCards.addItem(cardElement);
       };

       sectionCards.renderItems();
   })
   .catch(err => {
     console.error(`Error fetching initial data: ${err}`);
   });
 }

 document.addEventListener("DOMContentLoaded", fetchInitialData);


/*
// upload the user info and cards from the server
document.addEventListener("DOMContentLoaded", () => {
  const userUrl = `https://around.nomoreparties.co/v1/${groupId}/users/me`;

  // load userInfo
  let userId;
  fetch(userUrl, {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
  .then(response => response.json())
  .then(data => {
    // Process the received data
    userId = data._id;
    updateUserInfo(data);
    loadInitialCards(userId);
  })
  .catch(error => {
    console.error('Error:', error);
  });

*/

const formInputs = document.querySelectorAll(".popup__input");
formInputs.forEach(input => {
  input.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

// form event listeners
formProfile.addEventListener("submit", handleProfileSubmit);
formCard.addEventListener("submit", handleAddCardSubmit);



// user Info instance
buttonProfile.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  document.querySelector("#profile-input-name").value = userInfoData.name;
  document.querySelector("#profile-input-about").value = userInfoData.about;
  profilePopup.open(userInfoData)
  profilePopup.open();
});


// function to update the user information profile
function updateUserInfo(data){
  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__about');
  const profileAvatar = document.querySelector('.profile__avatar');

  profileName.textContent = data.name;
  profileAbout.textContent = data.about;
  profileAvatar.src = data.avatar;
}

// Set event listeneres for the popups
profilePopup._setEventListeners();
addCardPopup._setEventListeners();


  // event listenrs configuration
buttonProfile.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  profilePopup.open(userInfoData);
});


// events for open and closed
buttonCloseProfile.addEventListener("click", () => profilePopup.close());
buttonAddCard.addEventListener("click", () => addCardPopup.open())
buttonCloseCard.addEventListener("click", () => addCardPopup.close());
closeImage.addEventListener("click", handleCloseImage);




// Avatar update popup handling
avatarEdition.addEventListener("click", () => {
  avatarPopup.classList.add('popup__opener');
});

closeAvatarPopupButton.addEventListener("click", () => {
  avatarPopup.classList.remove('popup__opener')
});

formAvatar.addEventListener('submit', (event) => {
  event.preventDefault();
  const avatarUrl = inputAvatarUrl.value.trim();

  if (!avatarUrl) {
    console.error('Avatar URL cannot be empty');
    return;
  }

  updateAvatar(avatarUrl)
    .then(data => {
      document.querySelector(".profile__avatar").src = data.avatar;
      avatarPopup.classList.remove("popup__opener");
    })
    .catch(error => {
      console.error('Error updating avatar:', error)
    });
});


const profileFormValidation = new FormValidator(formProfile, {
  formSelector: ".popup__edit-form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__input-submit",
  inactiveButtonClass: "popup__button__disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

profileFormValidation.enableValidation()




