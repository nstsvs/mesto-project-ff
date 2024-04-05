import './pages/index.css';
import * as data from './utils/constants';
import { handleSubmit } from './utils/utils';
import { createCard, onDelete, onLike } from './components/card';
import { openPopup, closePopup } from './components/modal';
import { clearValidation, enableValidation } from './components/validation'
import { addNewCard, getInitialCards, getProfileInfo, updateAvatar, updateProfileInfo } from './api';

let userId = null;

// Добавление карточки на страницу
function addCard(cardData, method = 'append') {

	// создаем карточку, передавая обработчики в виде объекта `callbacks`
	const cardElement = createCard({
		cardData,
		userId,
		onLike,
		onDelete,
		openFullCardPopup
	});

	// вставляем карточку, используя метод (вставится `prepend` или `append`)
	data.cardsList[ method ](cardElement);
}

Promise.all([getInitialCards(), getProfileInfo()])
	.then(([cards, profileInfo]) => {
		// Инициализация данных
		data.profileTitle.textContent = profileInfo.name;
		data.profileDescription.textContent = profileInfo.about;
		data.profileImage.style.backgroundImage = `url(${profileInfo.avatar})`;
		userId = profileInfo._id;

		cards.forEach((card) => {
			addCard(card);
		});
	})
	.catch(console.error)

// Открытие карточки
function openFullCardPopup(name, link) {
	data.fullCardImage.src = link;
	data.fullCardImage.alt = name;
	data.fullCardCaption.textContent = name;
	openPopup(data.fullCardPopup);
}

// Кнопка редактирования профиля
data.editButton.addEventListener('click', () => {
	clearValidation([data.profileForm], data.validationConfig);
	openPopup(data.profileFormWrap);

	const currentName = data.profileTitle.textContent;
	const currentJob = data.profileDescription.textContent;

	data.nameInput.value = currentName;
	data.jobInput.value = currentJob;
});

data.profileImage.addEventListener('click', () => {
	clearValidation([data.avatarForm], data.validationConfig);
	openPopup(data.updateAvatarPopupWrapper);
});

// Кнопка добавления карточки
data.addCardButton.addEventListener('click', () => {
	clearValidation([data.cardForm], data.validationConfig);
	openPopup(data.cardFormWrap);
});

// Закрытие попапов. Находим все попапы и пробегаемся по ним, навешивая обработчик
data.popups.forEach((popup) => {
	popup.addEventListener('mousedown', (evt) => {
		if (evt.target.classList.contains('popup_is-opened') || (evt.target.classList.contains('popup__close'))) {
			closePopup(popup);
		}
	});
});

// Форма редактирования профиля
function handleProfileFormSubmit(evt) {
	function makeRequest() {
		// Получаем текущие значения
		const nameValue = data.nameInput.value;
		const jobValue = data.jobInput.value;

		return updateProfileInfo(nameValue, jobValue)
			.then(() => {
				// Устанавливаем текущие значения
				data.profileTitle.textContent = nameValue;
				data.profileDescription.textContent = jobValue;
				closePopup(data.profileFormWrap);
			})
	}
	handleSubmit(makeRequest, evt)
}
data.profileForm.addEventListener('submit', handleProfileFormSubmit);

// Форма добавления карточки на страницу
function handleCardFormSubmit(evt) {
	function makeRequest() {
		const nameValue = data.cardNameInput.value;
		const urlValue = data.cardUrlInput.value;

		return addNewCard(nameValue, urlValue)
			.then((cardData) => {
				const card = createCard({
					cardData,
					userId,
					onLike,
					onDelete,
					openFullCardPopup
				});
				data.cardsList.prepend(card);
				closePopup(data.cardFormWrap);
			})
	}
	handleSubmit(makeRequest, evt);
}
data.cardForm.addEventListener('submit', handleCardFormSubmit);

// Форма обновления аватара
function handleUpdateAvatarFormSubmit(evt) {
	function makeRequest() {
		const avatarUrl = data.avatarInput.value;

		return updateAvatar(avatarUrl)
			.then((user) => {
				data.profileImage.style.backgroundImage = `url('${user.avatar}')`;
				closePopup(data.updateAvatarPopupWrapper);
			})
	}

	handleSubmit(makeRequest, evt)
}
data.avatarForm.addEventListener('submit', handleUpdateAvatarFormSubmit);

enableValidation(data.validationConfig);
