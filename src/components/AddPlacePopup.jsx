import React, { useState } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое&nbsp;место"
      name="add-button"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
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
          value={name}
          onChange={handleNameChange}
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
          value={link}
          onChange={handleLinkChange}
        />
        <span id="link-input-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
