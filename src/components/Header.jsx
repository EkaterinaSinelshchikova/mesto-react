import React from "react";
import logo from "../img/logo.svg";

export function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
    </header>
  );
}
