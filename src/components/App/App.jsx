import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "../App/App.css";
import { coordinates, APIKey } from "../../utils/constants";
import Header from "../Header/header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, deleteItem, addItem } from "../../utils/Api";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
function App() {
  // State for storing weather data
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  // State for managing the active modal
  const [activeModal, setActiveModal] = useState("");

  // State for storing the list of clothing items
  const [clothingItems, setClothingItems] = useState([]);

  // State for storing the currently selected card
  const [selectedCard, setSelectedCard] = useState({});

  // State for managing the current temperature unit
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Function to handle card click events
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // Function to close the active modal
  const closeActiveModal = () => {
    setActiveModal("");
  };

  // Function to handle the add button click event
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  // Function to handle adding a new item
  const onAddItem = (values, onDone) => {
    return addItem(values)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
        onDone();
      })
      .catch(console.error);
  };

  // Function to handle deleting an item
  const handleDeleteItem = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prevItem) =>
          prevItem.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
  };

  // Function to handle toggle switch change
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    else setCurrentTemperatureUnit("C");
  };

  // useEffect to fetch weather data on component mount
  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        // Filter and set the weather data
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // Returning the JSX for the App component
  return (
    <div className="app">
      <div className="app__content">
        {/* Providing the current temperature unit and toggle function via context */}
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header handleCardClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
      {/* Conditional rendering for AddItemModal */}

      {/* Modal with form for adding a new garment */}
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            placeholder="Name"
            id="name"
            type="text"
            className="modal__input"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            placeholder="Image URL"
            id="imageUrl"
            type="url"
            className="modal__input"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label_type_radio">
            {" "}
            <input
              name="radio"
              id="hot"
              type="radio"
              className="modal__radio-input"
            />
            Hot
          </label>
          <label htmlFor="warm" className="modal__label_type_radio">
            <input
              name="radio"
              id="warm"
              type="radio"
              className="modal__radio-input"
            />
            Warm
          </label>
          <label htmlFor="cold" className="modal__label_type_radio">
            <input
              name="radio"
              id="cold"
              type="radio"
              className="modal__radio-input"
            />
            Cold
          </label>
        </fieldset>{" "}
      </ModalWithForm>
      {/* Item modal for previewing and deleting an item */}
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeActiveModal={closeActiveModal}
        handleDeleteClick={handleDeleteItem}
      />
      {activeModal === "delete-garment" && (
        <DeleteConfirmModal
          activeModal={activeModal}
          handleCloseClick={closeActiveModal}
          onDelete={handleDeleteItem}
        />
      )}
    </div>
  );
}

export default App;
