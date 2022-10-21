import React from "react";

export function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name}`}>
      <div className="popup__content">
        <button
          aria-label="Закрыть"
          className="popup__close-button"
          type="button"
        />
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} method="post">
          {props.children}
        </form>
      </div>
    </div>
  );
}
