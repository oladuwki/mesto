import FormValidator from "../script/FormValidator.js";
import Card from "../script/Card.js";
import Popup from "../script/Popup.js";
import PopupWithImage from "../script/PopupWithImage.js";
import PopupWithForm from "../script/PopupWithForm.js";
import UserInfo from "../script/UserInfo.js";
import Section from "../script/Section.js";

import './index.css';

import CloseIcon from "../images/CloseIcon.svg";
import deleteImage from "../images/delete.svg";
import headerImage from "../images/header.svg";
import like from "../images/like.svg";
import likeActive from "../images/likeactv.svg";
import profileImage from "../images/profile__image.jpg";
import trash from "../images/trash.svg";
import vector from "../images/vector.svg";
import vector1 from "../images/vector1.svg";
import vector2 from "../images/vector2.svg";



const images = [
  {name: "CloseIcon", image: CloseIcon},
  {name: "delete", image: deleteImage},
  {name: "headerImage", image: headerImage},
  {name: "like", image: like},
  {name: "likeActive", image: likeActive},
  {name: "profileImage", image: profileImage},
  {name: "trash", image: trash},
  {name: "vector", image: vector},
  {name: "vector1", image: vector1},
  {name: "vector2", image: vector2},


]

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const profileButton = profile.querySelector('.profile__info-btn');
const profileAddButton = document.querySelector('.profile__add-button');
const popUpEdit = document.querySelector('.popup_profile_content');
const popUpCloseButtons = document.querySelectorAll('.popup__close-button');
const containers = document.querySelectorAll('popup__container');
const popUpCreate = document.querySelector('.popup_place_content');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const [inputsError] = document.querySelectorAll('.popup__input');
const nameInput = document.querySelector('.popup__input_value_name');
const jobInput = document.querySelector('.popup__input_value_job');
const [editForm, cardForm] = document.querySelectorAll('.popup__form');
const placeNameInput = document.querySelector('.popup__input_value_place');
const linkInput = document.querySelector('.popup__input_value_link');
const popUpPhotoImage = document.querySelector('.popup__photo');
const popUpPhotoName = document.querySelector('.popup__name');
const popUpPhotoCard = document.querySelector('.popup_group_photo');
const elementsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.template').content;
const elementsList = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const [popupButton1, popupButton2] = document.querySelectorAll('.popup__button');
const template = document.querySelector('.template');

const initialCards = [
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

const userInfo = new UserInfo('.profile__name', '.profile__job');




function handleFormSubmit (evt, data) {
  evt.preventDefault();
  userInfo.setUserInfo(data);
}


function handleFormSubmitSecond(evt, data) {
  evt.preventDefault();
  const dataCard = {
    name: data.name,
    link: data.link
  };
  
  const createdCard = createCard(dataCard);
  prependCard(createdCard);
}

function prependCard(card){
  elementsList.prepend(card);
};

function appendCard(card){
  elementsList.append(card);
};

const popupWithImage = new PopupWithImage(popUpPhotoCard);


function createCard(cardData) {

  const card = new Card(cardData, template, () => {
    popupWithImage.open(cardData.name, cardData.link);
  });

  return card.generateCard();
  
};


const cardFormValidator = new FormValidator(settings, cardForm);
const editFormValidator = new FormValidator(settings, editForm);

cardFormValidator.enableValidation();
editFormValidator.enableValidation();

const popupWithEditForm = new PopupWithForm(popUpEdit, handleFormSubmit);
const popupWithCardForm = new PopupWithForm(popUpCreate, handleFormSubmitSecond);


profileButton.addEventListener('click', () => {
  popupWithEditForm.open();
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  editFormValidator.resetValidation(); 
});

profileAddButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  popupWithCardForm.open();
});

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => { //получаем данные из массива
    const createdCard = createCard(item);
    appendCard(createdCard);
  }
  
}, '.elements');

cardSection.renderItems();