let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let profileButton = profile.querySelector('.profile__info-btn');
let popUp = document.querySelector('.popup');
let popUpCloseButton = popUp.querySelector('.popup__close-button');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

function popUpOpen() {
  popUp.classList.add('popup_opened');
}

function popUpClose() {
  popUp.classList.remove('popup_opened');
}

let formElement = popUp.querySelector('.popup__form');

function handleFormSubmit (evt) {
  evt.preventDefault();

    let nameInput = popUp.querySelector('.popup__input_name');
    let jobInput = popUp.querySelector('.popup__input_job');
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popUpClose();
}

profileButton.addEventListener('click', popUpOpen);
popUpCloseButton.addEventListener('click', popUpClose);
formElement.addEventListener('submit', handleFormSubmit);