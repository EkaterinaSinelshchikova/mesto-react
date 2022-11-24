import React from "react";
import good from "../img/good.svg";
import bad from "../img/bad.svg";

export const InfoToolTip = ({ isSuccess, isOpen, onClose, ...props }) => {
  const signUpResult = {
    success: "Вы успешно зарегистрировались!",
    fail: "Что-то пошло не так! Попробуйте ещё раз.",
  };

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__content">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />

        <div
          style={{
            backgroundImage: `url(${
              isSuccess ? (props.src = { good }) : (props.src = { bad })
            })`,
          }}
          className="popup__icon"
        ></div>
        <p className="popup__title">
          {isSuccess ? signUpResult.success : signUpResult.fail}
        </p>
      </div>
    </div>
  );
};
