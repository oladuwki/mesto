import Popup from "./Popup.js";
import { api } from "../pages/index.js";


export default class PopupWithDelete extends Popup {
  constructor(popup, cardId) {
    super(popup);
    this._cardId = cardId;
    this._elementCard = document.getElementById(cardId);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector('.popup__form');
    this._popup.querySelector('.popup__button').addEventListener('click', (evt) => {
      evt.preventDefault();
      console.log(evt)
      api.deleteCard(this._cardId)
        .then(res => res.json())
        .then((result) => {
          console.log(result);
          this.close();
          this._elementCard.remove(result);
        })
    });  
  }

  // _removeCardTemplate(evt) {
  //   evt.target.closest('.element').remove();
  // };
}