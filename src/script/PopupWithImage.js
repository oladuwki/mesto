import Popup from "./Popup.js";

export default class PopupWIthImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popUpPhotoImage = this._popup.querySelector('.popup__photo');
    this._popUpPhotoName = this._popup.querySelector('.popup__name');
  }

  open(name, link) {
    this._popUpPhotoImage.src = link;
    this._popUpPhotoName.textContent = name;
    this._popUpPhotoImage.alt = name;
    super.open();
  }
}