import { baseUrl, request } from "./Api";

//sign up
function signUp({ name, avatarUrl: avatar, email, password }) {
  return request(`${baseUrl}/signup`, {
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
  });
}

//sign in

function signIn({ email, password }) {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Add Content-Type header
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

//edit profile

function editProfile({ name, avatarUrl: avatar }, token) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  });
}

function getCurrentUser(token) {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

export { signUp, signIn, getCurrentUser, editProfile };
