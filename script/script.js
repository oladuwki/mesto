let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let profileButton = profile.querySelector('.profile__info-btn');
let popUp = document.querySelector('.popup');
let popUpCloseButton = popUp.querySelector('.popup__close-button');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__input_value_name');
let jobInput = document.querySelector('.popup__input_value_job');
let formElement = popUp.querySelector('.popup__form');

function popUpOpen() {
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popUpClose() {
  popUp.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popUpClose();
}

profileButton.addEventListener('click', popUpOpen);
popUpCloseButton.addEventListener('click', popUpClose);
formElement.addEventListener('submit', handleFormSubmit);