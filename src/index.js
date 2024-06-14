import "./styles/index.css";
import Card from "../script/Card.js";
import FormValidator from "../script/FormValidator.js";
import Section from "../script/Section.js";
import {handleOpenProfileForm, handleCloseProfileForm, handleOpenCardForm, handleCloseCardForm , handleOpenImage, handleCloseImage} from "../script/utils.js";
import  PopupWithForm  from "../script/PopupWithForm.js";
import { UserInfo } from "../script/UserInfo.js";

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

const groupId = 'web_es_12';
const token = 'cff91bad-a8c7-417a-948a-f02fc6d5768b';
const cardsUrl = `https://around.nomoreparties.co/v1/${groupId}/cards`;

const sectionCards = new Section({
  items: [], //empty because the cards loads from the server
  renderer: function () {},
}, ".elements");

// handle card click sketch
const handleCardClick = (title, link) => {
  const popup = document.querySelector("#popup-show-picture");
  const popupImage = popup.querySelector(".popup__image");
  const popupTitle = popup.querySelector(".popup__image-title");

  popupImage.src = link;
  popupImage.alt = title;
  popupTitle.textContent = title;

  popup.classList.add("popup_opener");
}

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about"
});

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
    handleOpenImage(title, link);
  });

  return card;
}

// function to update user profile on the server
function updateUserProfile(name,about) {
  const userUrl = `https://around.nomoreparties.co/v1/${groupId}/users/me`;

  return fetch(userUrl, {
    method: 'PATCH',
    headers: {
      authorization: token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
});
}


// Form submit handlers
function handleProfileSubmit(evt){
  evt.preventDefault();

  const inputName = document.querySelector("#profile-input-name");
  const inputAbout = document.querySelector("#profile-input-about");

  updateUserProfile(inputName.value, inputAbout.value)
    .then(data => {
      userInfo.setUserInfo({ name: data.name, about: data.about });
      profilePopup.close();
    })
    .catch(error => {
      console.error("Error updating the user profile:", error);
    });
 /* userInfo.setUserInfo({name:inputName.value, about:inputAbout.value});
  profilePopup.close();*/
}

function handleAddCardSubmit(evt){
  evt.preventDefault();
  const inputCardTitle = document.querySelector("#input-card-title");
  const inputCardLink = document.querySelector("#input-card-url");
  const newCard = cardGenerator(inputCardTitle.value, inputCardLink.value);
  cardArea.prepend(newCard);
  addCardPopup.close();
}

function handleFormSubmit(evt,inputValues){
  evt.preventDefault();
  console.log(inputValues);
  userInfo.setUserInfo(inputValues.name, inputValues.about);
  this.close();
}

// Event listeners cofiguration
const profilePopup = new PopupWithForm(handleFormSubmit, "#popup-profile");
const addCardPopup = new PopupWithForm(handleAddCardSubmit, "#popup-add-card")

// Set event listeneres for the popups
profilePopup._setEventListeners();
addCardPopup._setEventListeners();

// user Info instance
buttonProfile.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  document.querySelector("#profile-input-name").value = userInfoData.name;
  document.querySelector("#profile-input-about").value = userInfoData.about;
  profilePopup.open(userInfoData)
  profilePopup.open();
});

// events for open and closed
buttonCloseProfile.addEventListener("click", () => profilePopup.close());
buttonAddCard.addEventListener("click", () => addCardPopup.open())
buttonCloseCard.addEventListener("click", () => addCardPopup.close());
closeImage.addEventListener("click", handleCloseImage);




const formInputs = document.querySelectorAll(".popup__input");
formInputs.forEach(input => {
  input.addEventListener("click", (event) => {
    event.stopPropagation();
  })
})

// form event listeners
formProfile.addEventListener("submit", handleProfileSubmit);
formCard.addEventListener("submit", handleAddCardSubmit);

// function to update the user information profile
function updateUserInfo(data){
  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__about');
  const profileAvatar = document.querySelector('.profile__avatar');

  profileName.textContent = data.name;
  profileAbout.textContent = data.about;
  profileAvatar.src = data.avatar;
}

//function to load initial cards from the server
function loadInitialCards() {
  fetch(cardsUrl, {
    method: "GET",
    headers: {
      authorization: token
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);// to watch the cards on the console
    data.forEach(cardData => {
      const newCard = new Card(cardData.name, cardData.link, templateCard, handleCardClick);
      sectionCards.addItem(newCard.generateCard());
    });
  })
  .catch(error => {
    console.error('Error loading the cards:', error);
  });
}

// upload the user ifo and cards from the server
document.addEventListener("DOMContentLoaded", () => {
  const userUrl = `https://around.nomoreparties.co/v1/${groupId}/users/me`;

  // load userInfo
  fetch(userUrl, {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
  .then(response => response.json())
  .then(data => {
    // Process the received data
    console.log(data); // for watch the data in the console
    updateUserInfo(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  loadInitialCards();

  // event listenrs configuration
buttonProfile.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  profilePopup.open(userInfoData);
});

// other event listeners

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


