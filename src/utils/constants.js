export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Общие селекторы
export const popups = document.querySelectorAll('.popup');
export const cardsList = document.querySelector('.places__list');

// Редактирование профиля
export const editButton = document.querySelector('.profile__edit-button');
export const profileFormWrap = document.querySelector('.popup_type_edit');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const profileImage = document.querySelector('.profile__image');
export const profileForm = document.forms['edit-profile'];
export const nameInput = profileForm.querySelector('.popup__input_type_name');
export const jobInput = profileForm.querySelector('.popup__input_type_description');
export const avatarForm = document.forms['update-avatar'];
export const avatarInput = avatarForm.querySelector('.popup__input_type_avatar');
export const updateAvatarPopupWrapper = document.querySelector('.popup_type_update-avatar');

// Добавление карточки
export const addCardButton = document.querySelector('.profile__add-button');
export const cardFormWrap = document.querySelector('.popup_type_new-card');
export const cardForm = document.forms['new-place'];
export const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
export const cardUrlInput = cardForm.querySelector('.popup__input_type_url');

// Открытие попапа с картинкой
export const fullCardPopup = document.querySelector('.popup_type_image');
export const fullCardImage = fullCardPopup.querySelector('.popup__image');
export const fullCardCaption = fullCardPopup.querySelector('.popup__caption');

// Удаление карточки
export const confirmDeletePopup = document.querySelector('.popup_type_confirm-delete');
export const confirmDeleteButton = confirmDeletePopup.querySelector('.popup__button_confirm-delete');
