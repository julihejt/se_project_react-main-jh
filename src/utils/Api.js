const baseUrl = "http://localhost:3001"; // Fixed baseUrl without trailing slash
const headers = {
  "Content-Type": "application/json",
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

function addItem({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Add Content-Type header
    },
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

export { getItems, addItem, deleteItem, processResponse, baseUrl };
