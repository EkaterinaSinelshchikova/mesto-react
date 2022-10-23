import { useCallback } from "react";

export function Card({ card, onCardClick }) {
  const handleCardClick = useCallback(() => {
    onCardClick(card);
  }, [card, onCardClick]);

  return (
    <div className="element" onClick={handleCardClick}>
      <div
        className="element__img"
        style={{ backgroundImage: `url(${card.link})` }}
      />
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            aria-label="Нравится"
            className="element__like-button"
            type="button"
          />
          <span className="elements__like-counter">
            {card.likes.length}
          </span>
        </div>
        <button
          className="element__delete-button"
          type="button"
          aria-label="Удалить"
        />
      </div>
    </div>
  );
}
