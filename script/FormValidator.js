class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }

  enableValidation() {
    this.formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListener();
  };

  _setEventListener() {
    const inputList = Array.from(this.formElement.querySelectorAll(this.settings.inputSelector));
    const buttonElement = this.formElement.querySelector(this.settings.submitButtonSelector);
    const checkInputValidity = this._checkInputValidity.bind(this);
    const toggleButtonState = this._toggleButtonState.bind(this);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
    }
    else {
        this._hideInputError(inputElement);
    }
  };

  _toggleButtonState(inputList, buttonElement) {
    if (!this._hasInvalidInput(inputList)) {
        buttonElement.classList.remove(this.settings.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
    else {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(this.settings.inactiveButtonClass);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
  };

  _showInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.settings.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.settings.inputErrorClass);
    errorElement.classList.remove(this.settings.errorClass);
    errorElement.textContent = '';
  };
}


export default FormValidator;