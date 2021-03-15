class Card {
    constructor(item, template, handleCardClick) {
      this._name = item.name;
      this._link = item.link;
      this._template = template;
      this._handleCardClick = handleCardClick;
    }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element;
  }

  _getTemplate() {
    const cardTemplate = this._template.content.querySelector('.element').cloneNode(true);

    return cardTemplate;
  }

  

  // _closeByEscape(evt) {
  //   if (evt.key === 'Escape') {
  //     this._handleClosePopup();
  //   }
  // }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', (evt) => {
      if (evt.target.type !== "button"){
        this._handleCardClick(this._name, this._link);   
      }
    });

    this._element.querySelector('.element__group').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__group_active');
    });

    this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
      this._removeCardTemplate(evt);
    });

   
  }

 

  _removeCardTemplate(evt) {
    evt.target.closest('.element').remove();
  };

  
}

export default Card;