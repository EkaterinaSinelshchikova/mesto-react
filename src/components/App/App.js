import { useCallback } from "react";
import { Header } from "../Header";
import { Main } from "../Main";
import { Footer } from "../Footer";
import { PopupWithForm } from "../PopupWithForm";
import { ImagePopup } from "../ImagePopup";

export function App() {
  const handleEditAvatarClick = useCallback(() => {
    document
      .querySelector(".popup_type_edit-avatar")
      .classList.add("popup__is-opened");
  }, []);

  const handleEditProfileClick = useCallback(() => {
    document
      .querySelector(".popup_type_edit-button")
      .classList.add("popup__is-opened");
  }, []);

  const handleAddPlaceClick = useCallback(() => {
    document
      .querySelector(".popup_type_add-button")
      .classList.add("popup__is-opened");
  }, []);

  return (
    <>
      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
      />

      <Footer />

      <PopupWithForm title="Редактировать&nbsp;профиль" name="edit-button">
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

      <PopupWithForm title="Новое&nbsp;место" name="add-button">
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

      <PopupWithForm title="Обновить аватар" name="edit-avatar">
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

      <ImagePopup />

      <template className="template-element">
        <div className="element">
          <img className="element__img" src="#" />
          <div className="element__group">
            <h2 className="element__title"></h2>
            <div className="element__like-container">
              <button
                aria-label="Нравится"
                className="element__like-button"
                type="button"
              ></button>
              <span className="elements__like-counter"></span>
            </div>
            <button
              className="element__delete-button"
              type="button"
              aria-label="Удалить"
            ></button>
          </div>
        </div>
      </template>
    </>
  );
}
