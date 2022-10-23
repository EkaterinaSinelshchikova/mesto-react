export function PopupWithForm({ isOpen, onClose, ...props }) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        isOpen ? "popup__is-opened" : ""
      }`}
    >
      <div className="popup__content">
        <button
          aria-label="Закрыть"
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} method="post">
          {props.children}
        </form>
      </div>
    </div>
  );
}
