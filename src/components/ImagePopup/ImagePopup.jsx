import React from "react";

export function ImagePopup(props) {
  return (
    props.card && (
      <div
        className={`popup popup_type_image-preview ${
          props.isOpen ? "popup__is-opened" : ""
        }`}
      >
        <div className="popup__container">
          <div className="popup__figure">
            <div
              className="popup__img"
              style={{ backgroundImage: `url(${props.card.link})` }}
            />
            <p className="popup__text">{props.card.name}</p>
            <button
              aria-label="Закрыть"
              className="popup__close-button"
              type="button"
              id="preview-popup-close-button"
              onClick={props.onClose}
            />
          </div>
        </div>
      </div>
    )
  );
}
