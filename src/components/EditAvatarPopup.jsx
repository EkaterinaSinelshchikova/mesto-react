import React, { useState, useEffect, useContext, useRef } from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);

  const [avatar, setAvatar] = useState("");

  const avatarInputEl = useRef(null)

  useEffect(() => {
    if (currentUser) {
      setAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  function handleAvatarChange(evt) {
    setAvatar(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarInputEl.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onUpdateAvatar={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          id="avatar-input"
          value={avatar}
          onChange={handleAvatarChange}
          ref={avatarInputEl}
        />
        <span className="popup__error" id="avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
}
