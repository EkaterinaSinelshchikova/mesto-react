import { useCallback, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = useCallback(() => {
    onCardClick(card);
  }, [card, onCardClick]);

  const handleCardLike = useCallback(() => {
    onCardLike(card);
  }, [card, onCardLike]);

  const handleCardDelete = useCallback(() => {
    onCardDelete(card);
  }, [card, onCardDelete]);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "element__delete-button_visible" : "element__delete-button_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  return (
    <div className="element" >
      <div
        className="element__img"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleCardClick}
      />
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            aria-label="Нравится"
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleCardLike}
          />
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
        <button
          className={cardDeleteButtonClassName}
          type="button"
          aria-label="Удалить"
          onClick={handleCardDelete}
        />
      </div>
    </div>
  );
}
