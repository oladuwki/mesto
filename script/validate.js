const defaultOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const forms = [cardForm, editForm];
const inputsAll = [inputsError];
const popupButton = [popupButton1, popupButton2];

cardForm.addEventListener('input', () => {
  const isValid = nameInput.validity.valid && jobInput.validity.valid;
  setSubmitButtonState(isValid, defaultOptions);
  showErrors(cardForm, [nameInput, jobInput]);
});

editForm.addEventListener('input', () => {
  const isValid = placeNameInput.validity.valid && linkInput.validity.valid ;
  setSubmitButtonState(isValid, defaultOptions);
  showErrors(editForm, [placeNameInput, linkInput]);
});

const showErrors = (form, inputs, options = defaultOptions) => {
  inputs.forEach((input) => {
    if(input.validity.valid) {
      hideInputError(form, input);
      
    } else {
      showInputError(form, input, input.validationMessage);
    }
      });
}

const showInputError = (formElement, inputElement, errorMessage, options = defaultOptions) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
};

const hideInputError = (formElement, inputElement, options = defaultOptions) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = '';
};

function setSubmitButtonState(isFormValid, options = defaultOptions) {
  if (isFormValid) {
    popupButton.forEach((button) => {
      button.removeAttribute('disabled');
      button.classList.remove(options.inactiveButtonClass);
    });
  } else {
    popupButton.forEach((button) => {
      button.setAttribute('disabled', true);
      button.classList.add(options.inactiveButtonClass);
    });
    
  }
}