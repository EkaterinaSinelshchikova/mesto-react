import avatar from "../../img/avatar.jpg";

export function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-edit">
          <img
            className="profile__avatar"
            src={avatar}
            alt="Аватар пользователя"
          />
          <button
            type="button"
            className="profile__avatar-edit-button"
            onClick={props.onEditAvatar}
          />
        </div>

        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__title">Жак-Ив Кусто</h1>
            <p className="profile__about">Исследователь океана</p>
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
      <section className="elements"></section>
    </main>
  );
}
