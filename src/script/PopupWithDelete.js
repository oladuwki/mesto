import Popup from "./Popup.js";
import { api } from "../pages/index.js";


export default class PopupWithDelete extends Popup {
  constructor(popup) {
    super(popup);
    this._card = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector('.popup__form');
    this._popup.querySelector('.popup__button').addEventListener('click', (evt) => {
      evt.preventDefault();
      console.log(evt)
      if(this._card) {
        api.deleteCard(this._card._cardId)
          
        .then((result) => {
          console.log(result);
          this.close();
          this._card._deleteCard();
          this._card = null;
        })
      }
    });  
  }

  open(_card) {
   this._card = _card;
    super.open();
  }

  // _removeCardTemplate(evt) {
  //   evt.target.closest('.element').remove();
  // };
}