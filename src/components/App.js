import { useCallback, useState } from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";

export function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
  }, []);

  const handleEditAvatarClick = useCallback(() => {
    setEditAvatarPopupOpen(true);
  }, []);

  const handleEditProfileClick = useCallback(() => {
    setEditProfilePopupOpen(true);
  }, []);

  const handleAddPlaceClick = useCallback(() => {
    setAddPlacePopupOpen(true);
  }, []);

  const closeAllPopups = useCallback(() => {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard();
  }, []);

  return (
    <>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />

      <Footer />
      <PopupWithForm
        title="Редактировать&nbsp;профиль"
        name="edit-button"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__label">
          <input
            className="popup__input"
            type="text"
            placeholder="Имя"
            required
            id="name-input"
            name="name"
            minLength="2"
            maxLength="40"
          />
          <span id="name-input-error" className="popup__error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input"
            type="text"
            required
            placeholder="О себе"
            id="about-input"
            name="about"
            minLength="2"
            maxLength="200"
          />
          <span id="about-input-error" className="popup__error"></span>
        </label>
        <button
          aria-label="Сохранить"
          className="popup__save-button"
          type="submit"
        >
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm
        title="Новое&nbsp;место"
        name="add-button"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__label">
          <input
            className="popup__input"
            type="text"
            placeholder="Название"
            id="place-input"
            name="name"
            required
            minLength="2"
            maxLength="30"
          />
          <span id="place-input-error" className="popup__error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input"
            type="url"
            placeholder="Ссылка на картинку"
            id="link-input"
            name="link"
            required
          />
          <span id="link-input-error" className="popup__error"></span>
        </label>
        <button
          aria-label="Сохранить"
          className="popup__save-button"
          type="submit"
        >
          Создать
        </button>
      </PopupWithForm>
      <PopupWithForm title="Вы уверены?" name="delete">
        <button className="popup__save-button" type="submit">
          Да
        </button>
      </PopupWithForm>
      <PopupWithForm
        title="Обновить аватар"
        name="edit-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__label">
          <input
            className="popup__input"
            type="url"
            name="avatar"
            placeholder="Ссылка на картинку"
            required
            id="avatar-input"
          />
          <span className="popup__error" id="avatar-input-error"></span>
        </label>
        <button className="popup__save-button" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={!!selectedCard}
      />
    </>
  );
}

