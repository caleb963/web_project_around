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
function handleOpenImage(title, link) {
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

export default{ handleOpenProfileForm, handleCloseProfileForm, handleOpenCardForm, handleCloseCardForm, handleOpenImage, handleCloseImage, handleCloseOutside, handleCloseOnEscape};