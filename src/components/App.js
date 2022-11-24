import { useCallback, useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { PopupWithForm } from "./PopupWithForm";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { ImagePopup } from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "./Login";
import { Register } from "./Register";
import { InfoToolTip } from "./InfoToolTip";
import * as authApi from "../utils/authApi.js";

export function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [isRegisterResultPopupOpen, setIsRegisterResultPopupOpen] =
    useState(false);
  const [isRegisterSucceed, setIsRegisterSucceed] = useState(true);
  const [isLoginForm, setIsLoginForm] = useState("");

  function handleClickMenuLink() {
    isLoginForm ? history.push("/signup") : history.push("/signin");
  }

  function handleClickTooltipPopupClose() {
    setIsRegisterResultPopupOpen(false);
    if (isRegisterSucceed) {
      history.push("/signin");
    }
  }

  function handleRegister(email, password) {
    authApi
      .register(email, password)
      .then((data) => {
        if (data._id || data.email) {
          setIsRegisterSucceed(true);
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterSucceed(false);
      });
    setIsRegisterResultPopupOpen(true);
  }

  function handleLogin(email, password) {
    authApi
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setEmail(email);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterSucceed(false);
        setIsRegisterResultPopupOpen(true);
      });
  }

  const tokenCheck = useCallback(() => {
    authApi
      .getContent()
      .then((res) => {
        if (res.data._id) {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/signin");
      });
  }, [history]);

  function handleLogout() {
    setEmail("");
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/signin");
  }

  const closeAllPopups = useCallback(() => {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }, []);

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
  }, []);

  const handleEditAvatarClick = useCallback(() => {
    setEditAvatarPopupOpen(true);
  }, []);

  const handleEditProfileClick = useCallback(() => {
    setEditProfilePopupOpen(true);
  }, []);

  const handleAddPlaceClick = useCallback(() => {
    setAddPlacePopupOpen(true);
  }, []);

  const handleUpdateUser = useCallback(
    (data) => {
      api
        .editProfile(data)
        .then((newUser) => {
          setCurrentUser(newUser);
          closeAllPopups();
        })
        .catch((err) => console.log(err));
    },
    [closeAllPopups]
  );

  const handleUpdateAvatar = useCallback(
    (data) => {
      api
        .editAvatar(data)
        .then((newUser) => {
          setCurrentUser(newUser);
          closeAllPopups();
        })
        .catch((err) => console.log(err));
    },
    [closeAllPopups]
  );

  const handleAddPlaceSubmit = useCallback(
    (data) => {
      api
        .addNewCard(data)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .catch((err) => console.log(err));
    },
    [cards, closeAllPopups]
  );

  const handleCardLike = useCallback(
    (card) => {
      const isLiked = card.likes.some((i) => i._id === currentUser._id);

      api
        .changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    },
    [currentUser]
  );

  const handleCardDelete = useCallback((card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then(setCurrentUser)
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        email={email}
        loggedIn={loggedIn}
        handleLogout={handleLogout}
        isLoginForm={isLoginForm}
        handleClickMenuLink={handleClickMenuLink}
      />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          Component={Main}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />

        <Route path="/signin">
          <Login handleLogin={handleLogin} setIsLoginForm={setIsLoginForm} />
        </Route>
        <Route path="/signup">
          <Register
            handleRegister={handleRegister}
            setIsLoginForm={setIsLoginForm}
          />
        </Route>
        <Route path="*">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm title="Вы уверены?" name="delete">
        <button className="popup__save-button" type="submit">
          Да
        </button>
      </PopupWithForm>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={!!selectedCard}
      />
      <InfoToolTip
        isSuccess={isRegisterSucceed}
        isOpen={isRegisterResultPopupOpen}
        onClose={handleClickTooltipPopupClose}
      />
    </CurrentUserContext.Provider>
  );
}
