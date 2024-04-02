import './pages/index.css';
import { createCard, onDelete, onLike } from './components/card';
import { openPopup, closePopup } from './components/modal';
import { clearValidation, enableValidation } from './components/validation'
import { addNewCard, getInitialCards, getProfileInfo, updateAvatar, updateProfileInfo } from './api';

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
const avatarForm = document.forms['update-avatar'];
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar');
const updateAvatarPopupWrapper = document.querySelector('.popup_type_update-avatar');

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

const formElements = [cardForm, profileForm, avatarForm];

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
function addCard(cardData) {
	// Создаем карточку с использованием полученных параметров и других функций
	const cardElement = createCard({
		cardData,
		userId,
		onLike,
		onDelete,
		openFullCardPopup
	});

	cardsList.append(cardElement);
}

Promise.all([getInitialCards(), getProfileInfo()])
	.then(([cards, profileInfo]) => {
		// Инициализация данных
		profileTitle.textContent = profileInfo.name;
		profileDescription.textContent = profileInfo.about;
		profileImage.style.backgroundImage = `url(${profileInfo.avatar})`;
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

profileImage.addEventListener('click', () => {
	openPopup(updateAvatarPopupWrapper)
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
	const popupButton = evt.target.querySelector('.popup__button');
	popupButton.textContent = 'Сохранение...';

	// Получаем текущие значения
	const nameValue = nameInput.value;
	const jobValue = jobInput.value;

	updateProfileInfo(nameValue, jobValue)
		.then(() => {
			// Устанавливаем текущие значения
			profileTitle.textContent = nameValue;
			profileDescription.textContent = jobValue;
			popupButton.textContent = 'Сохранить';
			closePopup(profileFormWrap);
		})
		.catch((err) => {
			console.log(err)
			popupButton.textContent = 'Сохранить';
		})
		.finally(() => {
			popupButton.textContent = 'Сохранить';
		})
}
profileForm.addEventListener('submit', handleProfileFormSubmit);

// Форма добавления карточки на страницу
function handleCardFormSubmit(evt) {
	evt.preventDefault();
	const popupButton = evt.target.querySelector('.popup__button');
	popupButton.textContent = 'Сохранение...';

	const nameValue = cardNameInput.value;
	const urlValue = cardUrlInput.value;

	addNewCard(nameValue, urlValue)
		.then((cardData) => {
			const card = createCard({
				cardData,
				userId,
				onLike,
				onDelete,
				openFullCardPopup
			});
			cardsList.prepend(card);
			popupButton.textContent = 'Создать';
			cardForm.reset();
			closePopup(cardFormWrap);
		})
		.catch((err) => {
			console.log(err)
		})
		.finally(() => {
			popupButton.textContent = 'Создать';
		})
}
cardForm.addEventListener('submit', handleCardFormSubmit);

// Обновление аватара
function handleUpdateAvatarFormSubmit(evt) {
	evt.preventDefault();
	const popupButton = evt.target.querySelector('.popup__button');
	popupButton.textContent = 'Сохранение...';
	const avatarUrl = avatarInput.value;

	updateAvatar(avatarUrl)
		.then((user) => {
			profileImage.style.backgroundImage = `url('${user.avatar}')`;
			popupButton.textContent = 'Сохранить';
			avatarForm.reset();
			closePopup(updateAvatarPopupWrapper);
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			popupButton.textContent = 'Сохранить';
		})
}
avatarForm.addEventListener('submit', handleUpdateAvatarFormSubmit);

enableValidation(validationConfig);
