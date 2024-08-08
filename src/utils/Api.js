const baseUrl = "http://localhost:3001"; // Fixed baseUrl without trailing slash
const headers = {
  "Content-Type": "application/json",
};

const processResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`).then(processResponse);
}

function addItem({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(processResponse);
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: headers,
  }).then(processResponse);
}

export { getItems, addItem, deleteItem, processResponse };
