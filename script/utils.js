import {cardGenerator} from "./index.js";

const popUpProfile = document.querySelector("#popup-profile");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const inputProfileName = document.querySelector("#profile-input-name");
const inputProfileAbout = document.querySelector("#profile-input-about");
const popUpAddCard = document.querySelector("#popup-add-card");
const cardArea = document.querySelector(".elements");
const inputCardTitle = document.querySelector("#input-card-title");
const inputCardLink = document.querySelector("#input-card-url");
const popUpTitle = document.querySelector(".popup__image-title");
const popUpImage = document.querySelector(".popup__image")
const popUpShowPicture = document.querySelector("#popup-show-picture");
const overlay = document.querySelector("#overlay");


// Function to open the profile form
function handleOpenProfileForm() {
  popUpProfile.classList.add("popup__opener");
  overlay.style.display = "block";
  document.addEventListener("click", handleCloseOutside);
  document.addEventListener("keydown", handleCloseOnEscape);
}

// Function to close the profile form
function handleCloseProfileForm() {
  popUpProfile.classList.remove("popup__opener");
  overlay.style.display = "none";
  document.removeEventListener("click", handleCloseOutside);
  document.removeEventListener("keydown", handleCloseOnEscape);
}

// Function to open the card form
function handleOpenCardForm() {
  popUpAddCard.classList.add("popup__opener");
  overlay.style.display = "block";
  document.addEventListener("click", handleCloseOutside);
  document.addEventListener("keydown", handleCloseOnEscape);
}

// Function to close the card form
function handleCloseCardForm() {
  popUpAddCard.classList.remove("popup__opener");
  overlay.style.display = "none";
  document.removeEventListener("click", handleCloseOutside);
  document.removeEventListener("keydown", handleCloseOnEscape);
}

// Function to open the popup image
export function handleOpenImage(title, link) {
  popUpImage.src = link;
  popUpTitle.textContent = title;
  popUpShowPicture.classList.add("popup__opener");
  document.addEventListener("click", handleCloseOutside);
  document.addEventListener("keydown", handleCloseOnEscape);
}

// Function to close the popup image
function handleCloseImage() {
  popUpShowPicture.classList.remove("popup__opener");
  document.removeEventListener("click", handleCloseOutside);
  document.removeEventListener("keydown", handleCloseOnEscape);
}

function handleProfileSubmit (evt) {
  evt.preventDefault();

  if (inputProfileName.value.trim() === "" || inputProfileAbout.value.trim() === "") {
    // show the message if the fields are empty
    alert("Please fill in the fields.");
    return;
  }

  // update the profile
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  // close the form after submiting
  handleCloseProfileForm();
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

if (inputCardTitle.value.trim() === "" || inputCardLink.value.trim() === "" ) {
    // show the messag if the field are empty
    alert("Please fill in the fields.");
    return;
}

  const newCard = cardGenerator(inputCardTitle.value, inputCardLink.value);
  console.log(inputCardLink.value);
  cardArea.prepend(newCard);
  handleCloseCardForm();
  // clear the form
  inputCardTitle.value = "";
  inputCardLink.value = "";
}

// function to handle closing forms when clicking outside or pressing escape key
function handleCloseOutside(evt) {
  if(evt.target.classList.contains("popup__opener")){
    handleCloseProfileForm();
    handleCloseCardForm();
    handleCloseImage();
  }
}

// close the form with escape key
function handleCloseOnEscape(evt) {
  if(evt.key === "Escape"){
    handleCloseProfileForm();
    handleCloseCardForm();
    handleCloseImage();
  }
}

export { handleOpenProfileForm, handleCloseProfileForm, handleOpenCardForm, handleCloseCardForm, handleCloseImage, handleProfileSubmit, handleAddCardSubmit}