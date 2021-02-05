const showInputError = (formElement, inputElement, errorMessage, form) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(form.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(form.errorClass);
};

const hideInputError = (formElement, inputElement, form) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(form.inputErrorClass);
  errorElement.classList.remove(form.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, form) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, form);
  }
  else {
      hideInputError(formElement, inputElement, form);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, form) => {
  if (!hasInvalidInput(inputList)) {
      buttonElement.classList.remove(form.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
  }
  else {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(form.inactiveButtonClass);
  }
}

const setEventListeners = (formElement, form) => {
  const inputList = Array.from(formElement.querySelectorAll(form.inputSelector));
  const buttonElement = formElement.querySelector(form.submitButtonSelector);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement, form);
          toggleButtonState(inputList, buttonElement, form);
      });
  });
};

const enableValidation = (form) => {
  const formList = Array.from(document.querySelectorAll(form.formSelector));

  formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
          evt.preventDefault();
      });

      setEventListeners(formElement, form);

  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});