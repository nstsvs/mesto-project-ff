import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, likeCard, onDelete } from './components/card';
import { openPopup, closePopup, closeOverlay } from './components/modal';

// Список карточек
const cardsList = document.querySelector('.places__list');

// Общие селекторы
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');

// Редактирование профиля
const editButton = document.querySelector('.profile__edit-button');
const profileFormWrap = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

// Добавление карточки
const addCardButton = document.querySelector('.profile__add-button');
const cardFormWrap = document.querySelector('.popup_type_new-card');
const cardForm = document.forms['new-place'];
const cardFormElement = cardForm.querySelector('.popup__form');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardForm.querySelector('.popup__input_type_url');

// Открытие попапа с картинкой
const fullCardPopup = document.querySelector('.popup_type_image');
const fullCardImage = fullCardPopup.querySelector('.popup__image');
const fullCardCaption = fullCardPopup.querySelector('.popup__caption');

// Добавление карточки на страницу
function addCard(link, name) {
	const cardElement = createCard(link, name, likeCard, onDelete, fullCardPopup);
	cardsList.append(cardElement);
}

// Вывод карточек на страницу
initialCards.forEach((element) => {
	addCard(element.link, element.name);
});

// Кнопка редактирования профиля
editButton.addEventListener('click', () => {
	openPopup(profileFormWrap);

	const currentName = profileTitle.textContent;
	const currentJob = profileDescription.textContent;

	nameInput.value = currentName;
	jobInput.value = currentJob;
});

// Кнопка добавления карточки
addCardButton.addEventListener('click', () => {
	openPopup(cardFormWrap);
});

// Кнопка закрытия модального окна
closeButtons.forEach((button) => {
	// Находим 1 раз ближайший к крестику попап
	const popup = button.closest('.popup');
	// Устанавливаем обработчик закрытия на крестик
	button.addEventListener('click', () => closePopup(popup));
});

// Закрытие модального окна через оверлей
popups.forEach((item) => {
	item.addEventListener('click', closeOverlay);
});

// Форма редактирования профиля
function handleProfileFormSubmit(evt) {
	evt.preventDefault();

	// Получаем текущие значения
	const nameValue = nameInput.value;
	const jobValue = jobInput.value;

	// Устанавливаем текущие значения
	profileTitle.textContent = nameValue;
	profileDescription.textContent = jobValue;

	closePopup(profileForm);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Форма добавления карточки на страницу
function handleCardFormSubmit(evt) {
	evt.preventDefault();

	const urlValue = cardUrlInput.value;
	const nameValue = cardNameInput.value;

	const card = createCard(urlValue, nameValue, likeCard, onDelete, fullCardPopup);

	cardsList.prepend(card);

	cardFormElement.reset();

	closePopup(cardForm);
}

cardForm.addEventListener('submit', handleCardFormSubmit);

// Открытие карточки
function openFullCardPopup(name, link) {
	fullCardImage.src = link;
	fullCardImage.alt = name;
	fullCardCaption.textContent = name;
	openPopup(fullCardPopup);
}
