import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, likeCard, onDelete } from './components/card';
import { openPopup, closePopup } from './components/modal';

// Список карточек
const cardsList = document.querySelector('.places__list');

// Общие селекторы
const popups = document.querySelectorAll('.popup');

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
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardForm.querySelector('.popup__input_type_url');

// Открытие попапа с картинкой
const fullCardPopup = document.querySelector('.popup_type_image');
const fullCardImage = fullCardPopup.querySelector('.popup__image');
const fullCardCaption = fullCardPopup.querySelector('.popup__caption');

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

// Вывод карточек на страницу
initialCards.forEach((element) => {
	addCard(element);
});

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
		}
	});
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

	closePopup(profileFormWrap);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Форма добавления карточки на страницу
function handleCardFormSubmit(evt) {
	evt.preventDefault();

	const urlValue = cardUrlInput.value;
	const nameValue = cardNameInput.value;

	const card = createCard({
		link: urlValue,
		name: nameValue,
		likeCard,
		onDelete,
		openFullCardPopup
	});

	cardsList.prepend(card);
	cardForm.reset();
	closePopup(cardFormWrap);
}

cardForm.addEventListener('submit', handleCardFormSubmit);
