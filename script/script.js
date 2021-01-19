const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const profileButton = profile.querySelector('.profile__info-btn');
const profileAddButton = document.querySelector('.profile__add-button');
const popUp = document.querySelector('.popup_profile_content');
const popUpCloseButtons = document.querySelectorAll('.popup__close-button');
const popupCard = document.querySelector('.popup_place_content');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_value_name');
const jobInput = document.querySelector('.popup__input_value_job');
const [cardForm, editForm] = document.querySelectorAll('.popup__form');
const placeNameInput = document.querySelector('.popup__input_value_place');
const linkInput = document.querySelector('.popup__input_value_link');

const popUpPhotoCard = document.querySelector('.popup_group_photo');
const elementsContainer = document.querySelector('.elements');
const popUpPhotoImage = document.querySelector('.popup__photo');
const popUpPhotoName = document.querySelector('.popup__name');
const cardTemplate = document.querySelector('#template').content;
const elementsList = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopUpPhoto(card) {
  popUpPhotoCard.classList.add('popup_opened');
  popUpPhotoImage.src = card.link;
  popUpPhotoName.textContent = card.name;
  popUpPhotoName.textContent.alt = card.name;
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popUp);
}

function togleLike(evt) {
  evt.target.classList.toggle('element__group_active');
};

let initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//создание шаблона карточки, принимая параметры ссылки и имени
function getCardTemplate(card){
  const template = cardTemplate.cloneNode(true);
  const popUpPhotoButtons = template.querySelectorAll('.element__image');
  const popUpPhotoTitles = template.querySelectorAll('.element__name');
  const removeCardButtons = template.querySelectorAll('.element__trash');
  const likeButtons = template.querySelectorAll('.element__group');

  popUpPhotoButtons.forEach((button) => {
    button.style.backgroundImage = "url('" + card.link + "')";
  });
  popUpPhotoTitles.textContent = card.name;
  popUpPhotoButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      if (evt.target.type !== "button"){
        openPopUpPhoto(card);
      }
    });
  });
  
  popUpPhotoTitles.forEach((title) => {
    title.textContent = card.name;
  });
  removeCardButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      removeCardTemplate(evt);
    });
  });
  likeButtons.forEach((button) => {
    button.addEventListener('click', togleLike);
  });
  
  return template;
};

function insertCards(){ //
  initialCards.forEach((card) => { //получаем данные из массива
    appendCard(card);
  });
};

insertCards();

function handleFormSubmitSecond(evt) {//форма отправки данных из попапа для добавления картинок
  evt.preventDefault();
  const dataCard = {
    name: placeNameInput.value,
    link: linkInput.value
  };
  createCard(dataCard);
  closePopup(popupCard);
  editForm.reset();
}

function prependCard(card){//отрисовка карточек в начале
  const cardTemplate = getCardTemplate(card);
  elementsList.prepend(cardTemplate);
};

function appendCard(card){//отрисовка карточек в конце
  const cardTemplate = getCardTemplate(card);
  elementsList.append(cardTemplate);
};

function createCard(card) {//добавление информации о карточках в массив и создание карточки
  prependCard(card);
};

function removeCard(card) {
  initialCards = initialCards.filter((item) => {
    return item.name !== card.name;
  });
  
};

function removeCardTemplate(evt) {
  evt.target.closest('.element').remove();
};

profileButton.addEventListener('click', () => {
  openPopup(popUp);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
profileAddButton.addEventListener('click', () => {
  openPopup(popupCard);});
popUpCloseButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    const openedPopup = [...popups].find((popup) => {
      return popup.classList.contains("popup_opened");
    });
    if (openedPopup) {
      closePopup(openedPopup);
    }
  });});
cardForm.addEventListener('submit', handleFormSubmit);
editForm.addEventListener('submit', handleFormSubmitSecond);//событие нажатия кнопки 'сохранить'