class FormValidator {
  constructor(settings, formElement, inputList,  buttonElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = inputList;
    this._buttonElement = buttonElement;
  }

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListener();
  };

  _resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });

    this._toggleButtonState();
  }

  _setEventListener() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    const checkInputValidity = this._checkInputValidity.bind(this);
    const toggleButtonState = this._toggleButtonState.bind(this);
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(inputElement);
            toggleButtonState(this._inputList, this._buttonElement);
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

  _toggleButtonState() {
    if (!this._hasInvalidInput(this._inputList)) {
        this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
    }
    else {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
  };

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  };
}


export default FormValidator;