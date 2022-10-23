import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Card } from "./Card";

export function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo().then((userInfo) => {
      setUserName(userInfo.name);
      setUserDescription(userInfo.about);
      setUserAvatar(userInfo.avatar);
    });
  }, []);

  useEffect(() => {
    api.getInitialCards().then((initialCards) => {
      setCards(initialCards);
    });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-edit">
          <div
            className="profile__avatar"
            alt="Аватар пользователя"
            style={{ backgroundImage: `url(${userAvatar})` }}
          />
          <button
            type="button"
            className="profile__avatar-edit-button"
            onClick={props.onEditAvatar}
          />
        </div>

        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__title">{userName}</h1>
            <p className="profile__about">{userDescription}</p>
          </div>
          <button
            aria-label="Редактировать"
            className="profile__edit-button"
            type="button"
            onClick={props.onEditProfile}
          />
        </div>

        <button
          aria-label="Добавить"
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} />
          );
        })}
      </section>
    </main>
  );
}
