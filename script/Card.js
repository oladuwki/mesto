class Card {
  constructor(name, link, template) {
    this.name = name;
    this.link = link;
    this.template = template;
    this.popupPhoto = document.querySelector('.popup_group_photo');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').style.backgroundImage = `url(${this.link})`;
    this._element.querySelector('.element__name').textContent = this.name;

    return this._element;
  }

  _getTemplate() {
    const cardTemplate = this.template.content.querySelector('.element').cloneNode(true);

    return cardTemplate;
  }

  _handleClosePopup() {
    this.popupPhoto.classList.remove('popup_opened');  
  }

  _closeByEscape(evt) {
    if (evt.key === 'Escape') {
      this._handleClosePopup();
    }
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', (evt) => {
      if (evt.target.type !== "button"){
        this._openPopUpPhoto();       
      }
    });

    this.popupPhoto.querySelector('.popup__close-button').addEventListener('click', () => {
      this._handleClosePopup();   
    });

    this._element.querySelector('.element__group').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__group_active');
    });

    this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
      this._removeCardTemplate(evt);
    });
  }

  _openPopUpPhoto() {
    document.addEventListener('keydown', this._closeByEscape.bind(this));
    this.popupPhoto.classList.add('popup_opened');
    this.popupPhoto.querySelector('.popup__photo').src = this.link;
    this.popupPhoto.querySelector('.popup__name').textContent = this.name;
    this.popupPhoto.querySelector('.popup__photo').alt = this.name;
  }

  _removeCardTemplate(evt) {
    evt.target.closest('.element').remove();
  };
}

export default Card;