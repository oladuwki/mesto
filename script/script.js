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
const user = {
  name: "Жак-Ив Кусто",
  job: "Исследователь океана"
};

setUser(user);


function popUpOpen() {
  popUp.classList.add('popup_opened');
  nameInput.value = user.name;
  jobInput.value = user.job;
}

function popUpClose() {
  popUp.classList.remove('popup_opened');
}

function setUser(data) {
  profileName.textContent = data.name;
  profileJob.textContent = data.job;
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  user.name = nameInput.value;
  user.job = jobInput.value;
  setUser(user);
  popUpClose();
}

profileButton.addEventListener('click', popUpOpen);
popUpCloseButton.addEventListener('click', popUpClose);
formElement.addEventListener('submit', handleFormSubmit);