import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Login({ handleLogin, setIsLoginForm }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setIsLoginForm(true);
  }, [setIsLoginForm]);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((oldData) => ({ ...oldData, [`${name}`]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = data;
    handleLogin(email, password);
  }

  return (
    <div>
      <div className="login">
        <div className="login__up-wrapper">
          <h1 className="login__title">Вход</h1>
          <form className="login__form" onSubmit={handleSubmit}>
            <label className="popup__label">
              <input
                type="email"
                name="email"
                required={true}
                className="login__input"
                placeholder="Email"
                value={data.email}
                onChange={handleChange}
              />
              <span className="popup__error"></span>
            </label>
            <label className="popup__label">
              <input
                type="password"
                name="password"
                required={true}
                className="login__input"
                placeholder="Пароль"
                value={data.password}
                onChange={handleChange}
              />
              <span className="popup__error"></span>
            </label>
          </form>
        </div>
        <div className="login__down-wrapper">
          <button className="login__button" onClick={handleSubmit}>
            Войти
          </button>
          <p className="login__text">
            Не зарегистрированы?
            <Link to="/signup" className="login__text">
            &nbsp;Регистрация
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
