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
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

const sectionCards = new Section({
  items: initialCards,
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

initialCards.forEach(function (element) {
  const newCard = new Card(element.name, element.link, templateCard, handleCardClick);
  sectionCards.addItem(newCard.generateCard());
})

// Form submit handlers
function handleProfileSubmit(evt){
  evt.preventDefault();
  const inputName = document.querySelector("#profile-input-name");
  const inputAbout = document.querySelector("#profile-input-about");
  userInfo.setUserInfo(inputName.value, inputAbout.value);
  profilePopup.close();
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
  profilePopup.close();
}

// Event listeners cofiguration
const profilePopup = new PopupWithForm(handleFormSubmit, "#popup-profile");
const addCardPopup = new PopupWithForm(handleAddCardSubmit, "#popup-add-card")

// Set event listeneres for the popups
profilePopup.setEventListeners();
addCardPopup.setEventListeners();

// user Info instance
buttonProfile.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  profilePopup.open(userInfoData)
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


const profileFormValidation = new FormValidator(formProfile, {
  formSelector: ".popup__edit-form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__input-submit",
  inactiveButtonClass: "popup__button__disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

profileFormValidation.enableValidation()


