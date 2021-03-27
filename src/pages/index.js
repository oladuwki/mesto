import FormValidator from "../script/FormValidator.js";
import Card from "../script/Card.js";
import Popup from "../script/Popup.js";
import PopupWithImage from "../script/PopupWithImage.js";
import PopupWithForm from "../script/PopupWithForm.js";
import PopupWithDelete from "../script/PopupWithDelete.js";
import UserInfo from "../script/UserInfo.js";
import Section from "../script/Section.js";
import Api from "../script/Api.js";

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
import vector123 from "../images/Vector123.svg";



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
  {name: "vector123", image: vector123}
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
const [editForm, cardForm, changeAvatarForm] = document.querySelectorAll('.popup__form');
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
const profileAvatar = document.querySelector('.profile__avatar');
const likesNumber = document.querySelectorAll('.element__group-number');
const likeButton = document.querySelector('.element__group');
const deletePopup = document.querySelector('.popup_delete');
const avatarPopup = document.querySelector('.popup_avatar');
const avatarInput = document.querySelector('.popup__input_value-avatar_link');

let userId = null;
let cardsId = null;

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar', userId);

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: 'a8225bf7-b253-4907-b1a0-ba222b85105e',
    'Content-Type': 'application/json'
  }
});

function handleFormSubmit (evt, data) {
  evt.preventDefault();
  saveButtonText(editForm, true, 'Сохранение...');
   
  const body = JSON.stringify({
    name: data.name,
    about: data.job
  })

  api.sendProfile(body) 
  .then((result) => {
    console.log(result);

    const {name, about, avatar, _id} = result;
    
    userInfo.setUserInfo({name, about, avatar, _id});
    popupWithEditForm.close();
  })
  .catch( (err) => {
    console.log(err);
  })
  .finally( () => {
    saveButtonText(editForm, false, 'Сохранить');
  });
}

function handleFormSubmitSecond(evt, data) {
  evt.preventDefault();
  saveButtonText(cardForm, true, 'Сохранение...');

  const body = JSON.stringify({
    name: data.name,
    link: data.link
  })
  

  api.sendCard(body)
   
  .then((result) => {
    console.log(result);
    const createdCard = createCard(result);
    prependCard(createdCard);
    popupWithCardForm.close();
  })
  .catch( (err) => {
    console.log(err);
  })
  .finally( () => {
    saveButtonText(cardForm, false, 'Сохранить');
  });
}

function handleFormSubmitAvatar(evt, dataAvatar) {
  evt.preventDefault();
  saveButtonText(changeAvatarForm, true, 'Сохранение...');

  const body = JSON.stringify({
   avatar: dataAvatar.link
  })
  
  api.changeAvatar(body)  
  .then((result) => {
    console.log(result);
    
    const {name, about, avatar, _id} = result;
    
    userInfo.setUserInfo({name, about, avatar, _id});
    popupWithAvatarForm.close();
  })
  .catch( (err) => {
    console.log(err);
  })
  .finally( () => {
    saveButtonText(changeAvatarForm, false, 'Сохранить');
  });
}

function prependCard(card){
  elementsList.prepend(card);
};

function appendCard(card){
  elementsList.append(card);
};

const popupWithImage = new PopupWithImage(popUpPhotoCard);
const popupWithDelete = new PopupWithDelete(deletePopup);

function createCard(cardData) {
  const card = new Card(cardData, template, () => {
    popupWithImage.open(cardData.name, cardData.link);
  }, (_card) => {
    popupWithDelete.open(_card);
  },
    (owner_id) => owner_id === userInfo.userId,
    (likes) => likes.some( (user) => {
      return userId === user._id; 
    }),
    (isLiked, setLikesCount, switchLike) => {
        if(isLiked) {
          api.deleteLikes(cardData._id)
          .then((result) => {
            console.log(result);

            const { likes } = result;

            setLikesCount(likes.length);
            switchLike();
          })
          .catch( (err) => {
            console.log(err);
          });
        } else {
          api.putLikes(cardData._id)
          .then((result) => {
            console.log(result);

            const { likes } = result;
            
            setLikesCount(likes.length);
            switchLike();
          })
          .catch( (err) => {
            console.log(err);
          });
        }
      })
  return card.generateCard();
};

const cardFormValidator = new FormValidator(settings, cardForm);
const editFormValidator = new FormValidator(settings, editForm);
const changeAvatarFormValidator = new FormValidator(settings, changeAvatarForm);

cardFormValidator.enableValidation();
editFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();

const popupWithEditForm = new PopupWithForm(popUpEdit, handleFormSubmit);
const popupWithCardForm = new PopupWithForm(popUpCreate, handleFormSubmitSecond);
const popupWithAvatarForm = new PopupWithForm(avatarPopup, handleFormSubmitAvatar);

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

profileAvatar.addEventListener('click', () => {
  changeAvatarFormValidator.resetValidation();
  popupWithAvatarForm.open();
});

Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
  api.getProfileInfo(),
  api.getInitialCards()
])
  .then( ([profileInfo, initialCards]) => {
    userInfo.setUserInfo(profileInfo);
    renderCards(initialCards);
  })
  .catch((err)=>{     //попадаем сюда если один из промисов завершится ошибкой
    console.log(err);
  })

function renderCards(result) {
   const cardSection = new Section({
      items: result,
      renderer: (item) => {
        const createdCard = createCard(item);
        appendCard(createdCard);
      }  
    }, '.elements');
  cardSection.renderItems();
}

api.getCardInfo()   
  .then((result) => {
    console.log(result)
    const { _id } = result;
    cardsId = _id;
  });
 
function saveButtonText(popupForm, status, textButton) {
  if(status) {
    popupForm.querySelector('.popup__button').textContent = textButton;
  } else {
    popupForm.querySelector('.popup__button').textContent = textButton;
  }
}