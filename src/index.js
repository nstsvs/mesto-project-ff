import './pages/index.css';
import { initialCards } from './components/cards';
import {createCard, likeCard, onDelete} from './components/card';
import { openModal, closeModal, closeOverlay } from './components/modal';

// Список карточек
const cardsList = document.querySelector('.places__list');

// Общие селекторы
const modal = document.querySelectorAll('.popup');
const closeButton = document.querySelectorAll('.popup__close');

// Редактирование профиля
const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// Добавление карточки
const addCardForm = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const addCardFormElement = addCardForm.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = addCardForm.querySelector('.popup__input_type_url');

// Открытие попапа с картинкой
const fullCardModal = document.querySelector('.popup_type_image');
const fullCardImage = fullCardModal.querySelector('.popup__image');
const fullCardCaption = fullCardModal.querySelector('.popup__caption');

// Добавление карточки на страницу
function addCard(link, name) {
	const cardElement = createCard(link, name, likeCard, onDelete, openFullCardModal);
	cardsList.append(cardElement);
}

// Вывод карточек на страницу
initialCards.forEach(function (element) {
	addCard(element.link, element.name);
});

// Кнопка редактирования профиля
editButton.addEventListener('click', function () {
	openModal(editProfileForm);
});

// Кнопка добавления карточки
addCardButton.addEventListener('click', function () {
	openModal(addCardForm);
});

// Кнопка закрытия модального окна
closeButton.forEach(function(button) {
	button.addEventListener('click', function() {
		closeModal(document.querySelector('.popup_is-opened'));
	});
});

// Закрытие модального окна через оверлей
modal.forEach(function (item) {
	item.addEventListener('click', closeOverlay);
});

// Форма редактирования профиля
function editProfileFormSubmit(evt) {
	evt.preventDefault();

	const nameValue = nameInput.value;
	const jobValue = jobInput.value;

	document.querySelector('.profile__title').textContent = nameValue;
	document.querySelector('.profile__description').textContent = jobValue;

	closeModal(editProfileForm);
}

formElement.addEventListener('submit', editProfileFormSubmit);

// Форма добавления карточки на страницу
function addCardFormSubmit(evt) {
	evt.preventDefault();

	const urlValue = cardUrlInput.value;
	const nameValue = cardNameInput.value;

	const card = createCard(urlValue, nameValue, likeCard, onDelete, openFullCardModal);

	cardsList.prepend(card);

	addCardFormElement.reset();

	closeModal(addCardForm);
}

addCardForm.addEventListener('submit', addCardFormSubmit);

// Открытие карточки
function openFullCardModal(name, link) {
	fullCardImage.src = link;
	fullCardImage.alt = name;
	fullCardCaption.textContent = name;
	openModal(fullCardModal);
}
