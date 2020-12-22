let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let profileButton = profile.querySelector('.profile__info_edit__button');
let popUp = content.querySelector('.popup');
let popUpCloseButton = popUp.querySelector('.popup__close-button');
let saveButton = popUp.querySelector('.popup__button');
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

popUpCloseButton.addEventListener('click', popUpClose); 

function changeInfo() {

  
}


function handleFormSubmit () { // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = popUp.querySelector('.popup__name');// Воспользуйтесь инструментом .querySelector()
    let jobInput = popUp.querySelector('.popup__job');// Воспользуйтесь инструментом .querySelector()

    // Получите значение полей из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = profile.querySelector('.profile__name');
    let profileJob = profile.querySelector('.profile__job');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popUp.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
saveButton.addEventListener('click', handleFormSubmit); 