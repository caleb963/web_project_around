import "./styles/index.css";
import Card from "../script/Card.js";
import FormValidator from "../script/FormValidator.js";
import Section from "../script/Section.js";
import {handleOpenProfileForm, handleCloseProfileForm, handleOpenCardForm, handleCloseCardForm , handleCloseImage, handleProfileSubmit, handleAddCardSubmit} from "../script/utils.js";


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


// events for open and closed
buttonProfile.addEventListener("click", handleOpenProfileForm);
buttonCloseProfile.addEventListener("click", handleCloseProfileForm);
buttonAddCard.addEventListener("click", handleOpenCardForm);
buttonCloseCard.addEventListener("click", handleCloseCardForm);
closeImage.addEventListener("click", handleCloseImage);

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


