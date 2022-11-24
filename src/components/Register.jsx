import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Register({ handleRegister, setIsLoginForm }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setIsLoginForm(false);
  }, [setIsLoginForm]);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((oldData) => ({ ...oldData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = data;
    handleRegister(email, password);
  }

  return (
    <div>
      <div className="register">
        <div className="register__up-wrapper">
          <h1 className="register__title">Регистрация</h1>
          <form className="register__form" onSubmit={handleSubmit}>
            <label className="popup__label">
              <input
                type="email"
                className="register__input"
                placeholder="Email"
                value={data.email}
                name="email"
                required={true}
                onChange={handleChange}
              />
              <span className="popup__error"></span>
            </label>
            <label className="popup__label">
              <input
                type="password"
                className="register__input"
                placeholder="Пароль"
                value={data.password}
                name="password"
                required={true}
                onChange={handleChange}
              />
              <span className="popup__error"></span>
            </label>
          </form>
        </div>
        <div className="register__down-wrapper">
          <button
            className="register__button"
            type="submit"
            onClick={handleSubmit}
          >
            Зарегистрироваться
          </button>
          <p className="register__text">
            Уже зарегистрированы?{" "}
            <Link to="/signin" className="register__text">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
