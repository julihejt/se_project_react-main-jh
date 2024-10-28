import { baseUrl, processResponse } from "./Api";

//sign up
function signUp({ name, avatarUrl: avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Add Content-Type header
    },
    body: JSON.stringify({
      name,
      avatar,
      email,
      password,
    }),
  }).then(processResponse);
}

//sign in

function signIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Add Content-Type header
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(processResponse);
}

//edit profile

function editProfile({ name, avatarUrl: avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  }).then(processResponse);
}

function getCurrentUser(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processResponse);
}

export { signUp, signIn, getCurrentUser, editProfile };
