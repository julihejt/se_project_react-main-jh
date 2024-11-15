const baseUrl = "http://localhost:3001"; // Fixed baseUrl without trailing slash
const headers = {
  "Content-Type": "application/json",
  authorization: `Bearer ${localStorage.getItem("jwt")}`,
};

const processResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Error: ${response.status} - ${response.statusText}`);
  }
};

function getItems() {
  return fetch(`${baseUrl}/items`).then(processResponse);
}

function onAddItem({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(processResponse);
}

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: headers,
  })
    .then(processResponse) // Use processResponse to handle the response
    .catch((error) => {
      console.error("Network or server error:", error);
      throw error;
    });
};

function likeCard(itemId) {
  return fetch(`${baseUrl}/items/${itemId}/likes/`, {
    method: "PUT",
    headers: headers,
  }).then(processResponse);
}

function unlikeCard(itemId) {
  return fetch(`${baseUrl}/items/${itemId}/likes/`, {
    method: "DELETE",
    headers: headers,
  }).then(processResponse);
}
export {
  getItems,
  onAddItem,
  deleteItem,
  processResponse,
  baseUrl,
  likeCard,
  unlikeCard,
};
