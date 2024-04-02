const showInputError = (formElement, inputElement, errorMessage, settings) => {
  console.log(`estos son los settings en showInputError ->`, settings)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

checkInputValidity = (formElement, inputElement, settings) => {
  console.log("es valido el input?", inputElement.validity.valid)
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
     inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};


enableValidation({
  formSelector: ".popup__edit-form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__input-submit",
  inactiveButtonClass: "popup__button__disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}); // ---> ejecuta enableValidation