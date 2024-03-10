import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard } from './components/card';
import { openModal, closeModal, closeOverlay } from './components/modal';

// Список карточек
const cardsList = document.querySelector('.places__list');

// Общие селекторы
const modal = document.querySelectorAll('.popup');
const closeButton = document.querySelectorAll('.popup__close');

// Редактирование профиля
const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.querySelector('.popup_type_edit');
// Добавление карточки
const addCardForm = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');

// Работа с формой
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

function addCard(link, name) {
	const cardElement = createCard(link, name, onDelete);
	cardsList.append(cardElement);
}

initialCards.forEach(function (element) {
	addCard(element.link, element.name);
});

function onDelete(evt) {
	const listItem = evt.target.closest('.places__item');
	listItem.remove();
}

editButton.addEventListener('click', function () {
	openModal(editProfileForm);
});

addCardButton.addEventListener('click', function () {
	openModal(addCardForm);
});

closeButton.forEach(function(button) {
	button.addEventListener('click', function() {
		closeModal(document.querySelector('.popup_is-opened'));
	});
});

modal.forEach(function (item) {
	item.addEventListener('click', closeOverlay);
});

function handleFormSubmit(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы

	const nameValue = nameInput.value;
	const jobValue = jobInput.value;

	document.querySelector('.profile__title').textContent = nameValue;
	document.querySelector('.profile__description').textContent = jobValue;

	closeModal(editProfileForm);
}

formElement.addEventListener('submit', handleFormSubmit);
