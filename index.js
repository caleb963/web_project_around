const profileElement = document.querySelector(".profile");
const profileNameElement = profileElement.querySelector(".profile__name");
const profileAboutElement = profileElement.querySelector(".profile__about");


const profileName = profileNameElement.textContent;
const profileAbout = profileAboutElement.textContent;

const editProfileButton = document.querySelector(".profile__edit-button");
const editPopupElement = document.querySelector(".popup");

const formElement = document.querySelector(".popup__edit-form");
const nameInput = formElement.querySelector(".popup__input_type-name");
const jobInput = formElement.querySelector(".popup__input_type-about");

function setPopupInputs() {
  nameInput.value = profileName;
  jobInput.value = profileAbout;
}

function openPopup() {
    editPopupElement.classList.add("popup_opened");
}

function handlePopupClick() {
  openPopup();
  setPopupInputs();
}

function saveForm(event) {
  event.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = jobInput.value;
  closePopup();
}

editProfileButton.addEventListener("click", handlePopupClick);

