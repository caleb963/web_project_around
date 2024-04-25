import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {handleOpenProfileForm, handleCloseProfileForm, handleOpenCardForm, handleCloseCardForm, handleCloseImage, handleProfileSubmit, handleAddCardSubmit} from "./utils.js";



//const popUpProfile = document.querySelector("#popup-profile");
const buttonProfile = document.querySelector("#profile-edit-button");
const buttonCloseProfile = document.querySelector("#close-profile-form");
//const profileName = document.querySelector(".profile__name");
//const profileAbout = document.querySelector(".profile__about");
//const inputProfileName = document.querySelector("#profile-input-name");
//const inputProfileAbout = document.querySelector("#profile-input-about");
const formProfile = document.querySelector("#profile-form");
const formProfileSubmit = document.querySelector("#profile-submit");
//const popUpAddCard = document.querySelector("#popup-add-card");
const buttonAddCard = document.querySelector("#profile-add-button");
const buttonCloseCard = document.querySelector("#close-addcard-form");
const templateCard = document.querySelector(".template__card");
const cardArea = document.querySelector(".elements");
//const inputCardTitle = document.querySelector("#input-card-title");
//const inputCardLink = document.querySelector("#input-card-url");
const formCard = document.querySelector("#addcard-form");
const buttonSubmitCard = document.querySelector("#addcard-submit");
//const popUpShowPicture = document.querySelector("#popup-show-picture");
const closeImage = document.querySelector("#close-popup-image");
//const popUpTitle = document.querySelector(".popup__image-title");
//const popUpImage = document.querySelector(".popup__image")
//const overlay = document.querySelector("#overlay");
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



// open and closed profile form

/*function handleOpenProfileForm () {
  popUpProfile.classList.add("popup__opener");
   // change the popup display:block
  overlay.style.display = "block";
  document.addEventListener("click", handleCloseOutside);
  document.addEventListener("keydown", handleCloseOnEscape);
}*/

/*function handleCloseProfileForm () {
  popUpProfile.classList.remove("popup__opener");
  // change the popup for display:none;
  overlay.style.display = "none";
  document.removeEventListener("click", handleCloseOutside);
  document.removeEventListener("keydown", handleCloseOnEscape);
}*/

// open and closed card form

/*function handleOpenCardForm () {
  popUpAddCard.classList.add("popup__opener");
  // change the popup display:block
  overlay.style.display = "block";
  console.log("open card form");
  document.addEventListener("click", handleCloseOutside);
  document.addEventListener("keydown", handleCloseOnEscape);
} */

/*function handleCloseCardForm () {
  popUpAddCard.classList.remove("popup__opener");
  // change the popup for display:none
  overlay.style.display = "none";
  document.removeEventListener("click", handleCloseOutside);
  document.removeEventListener("keydown", handleCloseOnEscape);
}*/

// open and closed popup image
 /*function handleOpenImage(title, link){
  popUpImage.src = link;
  popUpTitle.textContent = title;
  popUpShowPicture.classList.add("popup__opener");
  document.addEventListener("click", handleCloseOutside);
  document.addEventListener("keydown", handleCloseOnEscape);

}*/

/*function handleCloseImage() {
  popUpShowPicture.classList.remove("popup__opener");
  document.removeEventListener("click", handleCloseOutside);
  document.removeEventListener("keydown", handleCloseOnEscape);
}*/

/*function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  handleCloseProfileForm();
}*/

//function cardGenerator(title, link) {
 // const card = templateCard.content.querySelector(".elements__card").cloneNode(true);
  //const cardImage = card.querySelector(".elements__card-image");
  //const cardTitle = card.querySelector(".elements__card-title");
  //const likeButton = card.querySelector(".elements__card-heart");
  //const deleteButton = card.querySelector(".elements__card-delete");
  //cardImage.src = link;
  //cardImage.alt = title;
  //cardTitle.textContent = title;
  //Reassigning Events
  //likeButton.addEventListener("click", function() {
      //likeButton.classList.toggle("elements__card-heart_active");
  //});
  //deleteButton.addEventListener("click", function(){
    //card.remove();
  //});
  //cardImage.addEventListener("click", function(){
    //handleOpenImage(title, link);
  //});

  //return card;
//}

initialCards.forEach(function (element) {
  const newCard = new Card(element.name, element.link, templateCard);
  cardArea.append(newCard.generateCard());
})

/*function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = new Card(inputCardTitle.value, inputCardLink.value, templateCard);
  cardArea.prepend(newCard.generateCard());
  handleCloseCardForm();
  // clear the form
  inputCardTitle.value = "";
  inputCardLink.value = "";
}*/

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

const profileFormValidation = new FormValidator(formProfile, {
  formSelector: ".popup__edit-form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__input-submit",
  inactiveButtonClass: "popup__button__disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

profileFormValidation.enableValidation()