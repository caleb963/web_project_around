import{ FormValidator } from "./FormValidator.js"
import{Card} from "./Card.js"
import { handleOpenImage, handleCloseImage, handleOpenProfileForm, handleCloseProfileForm, handleOpenCardForm, handleCloseCardForm} from "./utils.js";


const popUpProfile = document.querySelector("#popup-profile");
const buttonProfile = document.querySelector("#profile-edit-button");
const buttonCloseProfile = document.querySelector("#close-profile-form");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const inputProfileName = document.querySelector("#profile-input-name");
const inputProfileAbout = document.querySelector("#profile-input-about");
const formProfileSubmit = document.querySelector("#profile-submit");
const formProfile = document.querySelector("#profile-form");
const popUpAddCard = document.querySelector("#popup-add-card");
const buttonAddCard = document.querySelector("#profile-add-button");
const buttonCloseCard = document.querySelector("#close-addcard-form");
const templateCard = document.querySelector(".template__card");
const cardArea = document.querySelector(".elements");
const inputCardTitle = document.querySelector("#input-card-title");
const inputCardLink = document.querySelector("#input-card-url");
const buttonSubmitCard = document.querySelector("#addcard-submit");
const formCard = document.querySelector("#addcard-form");
const popUpShowPicture = document.querySelector("#popup-show-picture");
const closeImage = document.querySelector("#close-popup-image");
const popUpTitle = document.querySelector(".popup__image-title");
const popUpImage = document.querySelector(".popup__image")
const overlay = document.querySelector("#overlay");
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


function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  handleCloseProfileForm();
}

function cardGenerator(title, link) {
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
  console.log(element);
  // apply class card in index
  const card = cardGenerator(element.name, element.link, ".template__card");
  cardArea.append(card);
})

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = cardGenerator(inputCardTitle.value, inputCardLink.value);
  console.log(inputCardLink.value);
  cardArea.prepend(newCard);
  handleCloseCardForm(popUpAddCard, overlay, handleCloseOutside, handleCloseOnEscape);
  // clear the form
  inputCardTitle.value = "";
  inputCardLink.value = "";
}

// events for open and closed
buttonProfile.addEventListener("click", handleOpenProfileForm);
buttonCloseProfile.addEventListener("click", handleCloseProfileForm);
buttonAddCard.addEventListener("click", handleOpenCardForm);
buttonCloseCard.addEventListener("click", handleCloseCardForm);
closeImage.addEventListener("click", handleCloseImage);
formProfile.addEventListener("submit", handleProfileSubmit);
formCard.addEventListener("submit", handleAddCardSubmit);

// close the form when clicking outside

function handleCloseOutside(evt) {
  if(evt.target.classList.contains("popup__opener")){
  handleCloseProfileForm();
  handleCloseCardForm();
  handleCloseImage();
  }
};

// close the form with escape key

function handleCloseOnEscape(evt) {
  if(evt.key === "Escape"){
    handleCloseProfileForm();
    handleCloseCardForm();
    handleCloseImage();
  }
};


window.addEventListener("DOMContentLoaded", (event) => {


const formElement = document.querySelector(".popup__form");
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__type_input_error",
  errorClass: "popup__error_visible",
}

if (formElement) {
  const validateProfileForm = new FormValidator(formElement, settings);
  validateProfileForm.enableValidation();
}

const popupProfile = document.querySelector(".popup_type_edit");
if (popupProfile) {
  const formValidatorProfile = new FormValidator(popupProfile, settings);
  formValidatorProfile.enableValidation();
}

const popupCard = document.querySelector(".popup_type_new-card");
if (popupCard) {
  const formValidatorCard = new FormValidator(popupCard, settings);
  formValidatorCard.enableValidation();
}

const popupAvatar = document.querySelector(".popup_type_avatar");
if (popupAvatar) {
  const formValidatorAvatar = new FormValidator(popupAvatar, settings);
  formValidatorAvatar.enableValidation();
}
});