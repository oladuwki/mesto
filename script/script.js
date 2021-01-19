let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let profileButton = profile.querySelector('.profile__info-btn');
let profileAddButton = document.querySelector('.profile__add-button');
let popUp = document.querySelector('.popup');
let popUpCloseButtons = document.querySelectorAll('.popup__close-button');
let popUpSecond = document.querySelector('.popup_place_content');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__input_value_name');
let jobInput = document.querySelector('.popup__input_value_job');
let [formElement, formElementSecond] = document.querySelectorAll('.popup__form');
let placeNameInput = document.querySelector('.popup__input_value_place');
let linkInput = document.querySelector('.popup__input_value_link');
let likeButtons = document.querySelectorAll('.element__group');
let popUpPhotoCard = document.querySelector('.popup_group_photo');
let popUpPhotoButton = document.querySelector('.elemen__image');
const elementsContainer = document.querySelector('.elements');
let removeCardButton = document.querySelector('.element__trash');
let popUpPhotoImage = document.querySelector('.popup__photo');
let popUpPhotoName = document.querySelector('.popup__name');

console.log(popUpCloseButtons);
function popUpOpen() {
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popUpOpenSecond() {
  popUpSecond.classList.add('popup_opened');
}

function popUpClose() {
  popUp.classList.remove('popup_opened');
  popUpSecond.classList.remove('popup_opened');
  popUpPhotoCard.classList.remove('popup_opened');
}

function popUpPhotoOpen(card) {
  popUpPhotoCard.classList.add('popup_opened');
  popUpPhotoImage.src = card.link;
  popUpPhotoName.textContent = card.name;
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popUpClose();
}

function togleLike(evt) {
  evt.target.classList.toggle('element__group_active');
  console.log(evt);
};

profileButton.addEventListener('click', popUpOpen);
profileAddButton.addEventListener('click', popUpOpenSecond);
popUpCloseButtons.forEach((button) => {
  button.addEventListener('click', popUpClose);
});
formElement.addEventListener('submit', handleFormSubmit);


console.log(likeButtons);

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


const cardTemplate = document.querySelector('#template').content;
const elementsList = document.querySelector('.elements');

//создание шаблона карточки, принимая параметры ссылки и имени
function getCardTemplate(card){
  const template = cardTemplate.cloneNode(true);

  template.querySelector('.element__image').style.backgroundImage = "url('" + card.link + "')";
  template.querySelector('.element__image').addEventListener('click', (evt) => {
    if (evt.target.type !== "button"){
      popUpPhotoOpen(card);
    }
  });
  template.querySelector('.element__name').textContent = card.name;
  template.querySelector('.element__trash').addEventListener('click', (evt) => {
    removeCard(card);
    removeCardTemplate(evt);
  });
  template.querySelector('.element__group').addEventListener('click', togleLike);

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
  popUpClose();
  formElementSecond.reset();
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
  initialCards.unshift(card);
  prependCard(card);
};

function removeCard(card) {
  initialCards = initialCards.filter((item) => {
    return item.name !== card.name;
  });
};

function removeCardTemplate(evt) {
  const cardItem = evt.target.closest('.element');
    cardItem.remove();
};


function remove(evt) {
  console.log(evt);
};

formElementSecond.addEventListener('submit', handleFormSubmitSecond);//событие нажатия кнопки 'сохранить'

