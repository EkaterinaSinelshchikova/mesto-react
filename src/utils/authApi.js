export const BASE_URL = "https://auth.nomoreparties.co";

export function checkResponse(response) {
  return response.ok
    ? response.json()
    : Promise.reject(`Ошибка ${response.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};
