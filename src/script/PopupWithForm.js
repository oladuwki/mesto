import Popup from "./Popup.js";
export default class PopupWIthForm extends Popup{
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
   
  }

  _getInputValues() {
    const inputs = this._popup.querySelectorAll('.popup__input');
    console.log(inputs)
    return Array.from(inputs).reduce((obj, input) => {
      const key = input.name;
      const value = input.value;
      obj[key] = value;
      return obj;
    }, {});
  }

  setEventListeners() {
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      this._handleFormSubmit(evt, this._getInputValues());
      this.close();
    });
    
  }

  close() {
    super.close();
    this._form.reset();
  }
}