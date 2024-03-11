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

function addCard(link, name) {
	const cardElement = createCard(link, name, likeCard, onDelete, openFullCardModal);
	cardsList.append(cardElement);
}

initialCards.forEach(function (element) {
	addCard(element.link, element.name);
});

function likeCard(evt) {
	evt.target.classList.toggle('card__like-button_is-active');
}

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

function editProfileFormSubmit(evt) {
	evt.preventDefault();

	const nameValue = nameInput.value;
	const jobValue = jobInput.value;

	document.querySelector('.profile__title').textContent = nameValue;
	document.querySelector('.profile__description').textContent = jobValue;

	closeModal(editProfileForm);
}

formElement.addEventListener('submit', editProfileFormSubmit);

function openFullCardModal(name, link) {
	fullCardImage.src = link;
	fullCardImage.alt = name;
	fullCardCaption.textContent = name;
	openModal(fullCardModal);
}

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
