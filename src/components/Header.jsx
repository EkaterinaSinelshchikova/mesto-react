import React from "react";
import logo from "../img/logo.svg";

export function Header({
  email,
  loggedIn,
  handleLogout,
  isLoginForm,
  handleClickMenuLink,
}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <div className="header__sing">
        <h2 className="header__text">{email}</h2>
        <button
          className="header__link"
          type="button"
          onClick={loggedIn ? handleLogout : handleClickMenuLink}
        >
          {loggedIn ? "Выйти" : isLoginForm ? "Регистрация" : "Войти"}
        </button>
      </div>
    </header>
  );
}
