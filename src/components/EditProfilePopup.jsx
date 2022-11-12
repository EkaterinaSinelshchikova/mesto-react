import React, { useState, useContext, useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать&nbsp;профиль"
      name="edit-button"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
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
          value={name}
          onChange={handleNameChange}
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
          value={description}
          onChange={handleDescriptionChange}
        />
        <span id="about-input-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
