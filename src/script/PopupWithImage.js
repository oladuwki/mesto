import Popup from "./Popup.js";


export default class PopupWIthImage extends Popup {
  constructor(popup, name, link) {
    super(popup);
    this._name = name;
    this._link = link;
    console.log(this._popup);
  }

  open() {
    const popUpPhotoImage = this._popup.querySelector('.popup__photo');
    const popUpPhotoName = this._popup.querySelector('.popup__name');

    popUpPhotoImage.src = this._link;
    popUpPhotoName.textContent = this._name;
    popUpPhotoName.alt = this._name;
    super.open();
  }
}