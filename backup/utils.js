export function handleOpenImage(title, link, popUpImage, popUpTitle, popUpShowPicture) {
  popUpImage.src = link;
  popUpTitle.textContent = title;
  popUpShowPicture.classList.add("popup__opener");
}

export function handleCloseImage(popUpShowPicture){
  popUpShowPicture.classList.remove("popup__opener");
}

export function handleOpenProfileForm(popUpProfile, profileName, profileAbout, inputProfileName, inputProfileAbout) {
  if (profileName && profileAbout && inputProfileName && inputProfileAbout && popUpProfile) {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
  popUpProfile.classList.add("popup__opener");
  }else {
    console.error("one or more elements are missing from the DOM");
  }
}

export function handleCloseProfileForm(popUpProfile) {
  popUpProfile.classList.remove("popup__opener");
}

export function handleOpenCardForm(popUpAddCard) {
  popUpAddCard.classList.add("popup__opener");
}

export function handleCloseCardForm(popUpAddCard) {
  popUpAddCard.classList.remove("popup__opener");
}

