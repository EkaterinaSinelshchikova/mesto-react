import React from "react";

export function ImagePopup() {
  return (
    <div className="popup popup_type_image-preview">
      <div className="popup__container">
        <div className="popup__figure">
          <img className="popup__img" src="#" alt="#" />
          <p className="popup__text"></p>
          <button
            aria-label="Закрыть"
            className="popup__close-button"
            type="button"
            id="preview-popup-close-button"
          ></button>
        </div>
      </div>
    </div>
  );
}
