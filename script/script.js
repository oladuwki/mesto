let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let profileButton = profile.querySelector('.profile__info-btn');
let popUp = content.querySelector('.popup');
let popUpCloseButton = popUp.querySelector('.popup__close-button');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
// if (profileButton == 0) {
//   popUp.classList.add('popup_opened');
// }


function popUpOpen() {
  popUp.classList.add('popup_opened');
}


profileButton.addEventListener('click', popUpOpen); 

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

popUpCloseButton.addEventListener('click', popUpClose);
formElement.addEventListener('submit', handleFormSubmit);