import { useContext } from "react";
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    currentUser && (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-edit">
            <div
              className="profile__avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            />
            <button
              type="button"
              className="profile__avatar-edit-button"
              onClick={props.onEditAvatar}
            />
          </div>

          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__about">{currentUser.about}</p>
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
          {props.cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </section>
      </main>
    )
  );
}
