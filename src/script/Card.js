class Card {
    constructor(items, template, handleCardClick, openPopupWithDelete, isDeleteIconActive, isLikeByMe, handleLikeClick) {
      this._name = items.name;
      this._link = items.link;
      this._likes = items.likes;
      this._cardId = items._id;
      this._ownerId = items.owner._id;
      this._template = template;
      this._handleCardClick = handleCardClick;
      this._openPopupWithDelete = openPopupWithDelete;
      this._isDeleteIconActive = isDeleteIconActive;
      this._isLikeByMe = isLikeByMe;
      this._handleLikeClick = handleLikeClick;
      this._isLiked = false;
      console.log(this._ownerId)
    }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.element__name').textContent = this._name;
    this._setLikesCount(this._likes.length);
    this._element.id = this._cardId;

    if(this._isDeleteIconActive(this._ownerId)){
      this._element.querySelector('.element__trash').classList.add('element__trash_active');
    };

    this._isLiked = this._isLikeByMe(this._likes);
    
    if(this._isLiked){
      this._element.querySelector('.element__group').classList.add('element__group_active');
    };


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
      this._handleLikeClick(this._isLiked, this._setLikesCount.bind(this), this._switchLike.bind(this));
      
    });

    this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
      this._openPopupWithDelete();
    });

   
  }  

  _setLikesCount(likesNumber) {
    this._element.querySelector('.element__group-number').textContent = likesNumber;
  } 

  _switchLike() {
    this._isLiked = !this._isLiked;
  }
}

export default Card;