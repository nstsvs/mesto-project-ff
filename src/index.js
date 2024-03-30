import './pages/index.css';
import { createCard, likeCard, onDelete } from './components/card';
import { openPopup, closePopup } from './components/modal';
import { clearValidation, enableValidation } from './components/validation'
import {addNewCard, getInitialCards, getProfileInfo, updateProfileInfo} from './api';

// Список карточек
const cardsList = document.querySelector('.places__list');

// Общие селекторы
const popups = document.querySelectorAll('.popup');

// Редактирование профиля
const editButton = document.querySelector('.profile__edit-button');
const profileFormWrap = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

// Добавление карточки
const addCardButton = document.querySelector('.profile__add-button');
const cardFormWrap = document.querySelector('.popup_type_new-card');
const cardForm = document.forms['new-place'];
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardForm.querySelector('.popup__input_type_url');

// Открытие попапа с картинкой
const fullCardPopup = document.querySelector('.popup_type_image');
const fullCardImage = fullCardPopup.querySelector('.popup__image');
const fullCardCaption = fullCardPopup.querySelector('.popup__caption');

const formElements = [cardForm, profileForm];

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
};

let userId = null;

// Добавление карточки на страницу
function addCard(cardParameters) {
	// Извлекаем необходимые параметры из объекта cardParameters
	const { link, name } = cardParameters;

	// Создаем карточку с использованием полученных параметров и других функций
	const cardElement = createCard({
		link,
		name,
		likeCard,
		onDelete,
		openFullCardPopup
	});

	cardsList.append(cardElement);
}

Promise.all([getInitialCards(), getProfileInfo()])
	.then(([cards, profileInfo]) => {
		profileTitle.textContent = profileInfo.name;
		profileDescription.textContent = profileInfo.about;
		profileImage.src = profileInfo.avatar;
		userId = profileInfo._id;

		cards.forEach((card) => {
			addCard(card);
		});
	})
	.catch((err) => {
		console.log('Error: ', err);
	})

// Открытие карточки
function openFullCardPopup(name, link) {
	fullCardImage.src = link;
	fullCardImage.alt = name;
	fullCardCaption.textContent = name;
	openPopup(fullCardPopup);
}

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

// Закрытие попапов. Находим все попапы и пробегаемся по ним, навешивая обработчик
popups.forEach((popup) => {
	popup.addEventListener('mousedown', (evt) => {
		if (evt.target.classList.contains('popup_is-opened') || (evt.target.classList.contains('popup__close'))) {
			closePopup(popup);
			clearValidation(formElements, validationConfig);
			cardForm.reset();
		}
	});
});

// Форма редактирования профиля
function handleProfileFormSubmit(evt) {
	evt.preventDefault();

	// Получаем текущие значения
	const nameValue = nameInput.value;
	const jobValue = jobInput.value;

	updateProfileInfo(nameValue, jobValue)
		.then(() => {
			// Устанавливаем текущие значения
			profileTitle.textContent = nameValue;
			profileDescription.textContent = jobValue;

			// Закрытие попапа после успешного обновления
			closePopup(profileFormWrap);
		})
		.catch((err) => {
			console.log(err)
		})
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Форма добавления карточки на страницу
function handleCardFormSubmit(evt) {
	evt.preventDefault();

	const nameValue = cardNameInput.value;
	const urlValue = cardUrlInput.value;

	addNewCard(nameValue, urlValue)
		.then((newCard) => {
			const card = createCard({
				name: newCard.name,
				link: newCard.link,
				likeCard,
				onDelete,
				openFullCardPopup
			});
			cardsList.prepend(card);

			cardForm.reset();
			closePopup(cardFormWrap);
		})
		.catch((err) => {
			console.log(err)
		})
}

cardForm.addEventListener('submit', handleCardFormSubmit);

enableValidation(validationConfig);
