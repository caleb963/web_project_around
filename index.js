const popUpProfile = document.querySelector("#popup-profile");
const buttonProfile = document.querySelector("#profile-edit-button");
const buttonCloseProfile = document.querySelector("#close-profile-form");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const inputProfileName = document.querySelector("#profile-name");
const inputProfileAbout = document.querySelector("#profile-about");
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
function handleOpenProfileForm () {
  popUpProfile.classList.add("popup__opener");
}

function handleCloseProfileForm () {
  popUpProfile.classList.remove("popup__opener");
}

// open and closed card form
function handleOpenCardForm () {
  popUpAddCard.classList.add("popup__opener");
  console.log("open card form");
}

function handleCloseCardForm () {
  popUpAddCard.classList.remove("popup__opener");
}

// open and closed popup image
function handleOpenImage(title, link){
  popUpImage.src = link;
  popUpTitle.textContent = title;
  popUpShowPicture.classList.add("popup__opener");
}

function handleCloseImage() {
  popUpShowPicture.classList.remove("popup__opener");
}

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
  cardTitle.textContent = title;
  likeButton.addEventListener("click", function() {
      likeButton.classList.toggle("elements__card-heart_active");
  })
  deleteButton.addEventListener("click", function(){
    card.remove();
  })
  cardImage.addEventListener("click", function(){
    handleOpenImage(title, link);
  })

  return card;
}

initialCards.forEach(function (element) {
  console.log(element);
  const newCard = cardGenerator(element.name, element.link);
  cardArea.append(newCard);
})

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = cardGenerator(inputCardTitle.value, inputCardLink.value);
  cardArea.prepend(newCard);
  handleCloseCardForm();
}

// events for open and closed
buttonProfile.addEventListener("click", handleOpenProfileForm);
buttonCloseProfile.addEventListener("click", handleCloseProfileForm);
buttonAddCard.addEventListener("click", handleOpenCardForm);
buttonCloseCard.addEventListener("click", handleCloseCardForm);
closeImage.addEventListener("click", handleCloseImage);

formProfile.addEventListener("submit", handleProfileSubmit);
formCard.addEventListener("submit", handleAddCardSubmit);
