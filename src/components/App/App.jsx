import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "../App/App.css";
import { coordinates, APIKey } from "../../utils/constants";
import Header from "../Header/header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  deleteItem,
  addItem,
  likeCard,
  unlikeCard,
  createCard,
  deleteCard,
} from "../../utils/Api";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";

import { signUp, signIn, getCurrentUser, editProfile } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import CurrentUserContext from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../editProfileModal/editProfileModal";

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

  const handleRegisterModal = () => {
    setActiveModal("signup");
  };
  const handleLoginModal = () => {
    setActiveModal("login");
  };
  const handleEditProfileModal = () => {
    setActiveModal("editprofile");
  };

  // Function to handle adding a new item
  const onAddItem = (values, onDone) => {
    return addItem({ ...values, token: localStorage.getItem("jwt") })
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
        onDone();
      })
      .catch(console.error);
  };

  const handleDeleteItem = () => {
    console.log("Attempting to delete item with ID:", selectedCard._id);
    deleteItem(selectedCard._id)
      .then(() => {
        console.log("Item deleted successfully");
        setClothingItems((prevItems) => {
          return prevItems.filter((item) => item._id !== selectedCard._id);
        });
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
  };

  const signUp = (data) => {
    signUp(data)
      .then(
        (res = {
          onLogIn(res) {
            closeActiveModal();
          },
        })
      )
      .catch(console.error);
  };

  const logIn = (data) => {
    signIn(data)
      .then(
        (res = {
          setIsLoggedIn() {
            localStorage.setItem("jwt", res.token);
            closeActiveModal();
          },
        })
      )
      .catch(console.error);
  };

  const EditProfileModal = (data) => {
    const token = localStorage.getItem("jwt");
    editProfile(data, token)
      .then((res) => {
        setCurrentUser(res.data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (data) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    //IF NOT LIKED
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        //LIKE THE CARD
        likeCard(data, token)
          // the first argument is the card's id
          .addCardLike(data, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        //IF IS LIKED,
        unlikeCard(data)
          // the first argument is the card's id
          //REMOVE LIKED
          .removeCardLike({ cardId, token })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
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

  // useEffect to fetch clothing items from the server
  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    //gets token from local storage
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }
    //checks token
    getCurrentUser(token)
      .then((user) => {
        //if tokemn is valid,
        //receieve the user data and set logged in to true

        setIsLoggedIn(true);
        // store the user info in a state variable
        setCurrentUser(user);
      })
      .catch(() => {
        console.error;
        setIsLoggedIn(false);
      });
  }, []);

  // Returning the JSX for the App component
  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app__content">
          {/* Providing the current temperature unit and toggle function via context */}
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header
              handleCardClick={handleAddClick}
              handleRegisterModal={handleRegisterModal}
              handleLoginModal={handleLoginModal}
              isLoggedIn={isLoggedIn}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      handleEditProfileModal={handleEditProfileModal}
                      onCardLike={handleCardLike}
                      clothingItems={clothingItems}
                      selectedCard={selectedCard}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
            {/* Conditional rendering for AddItemModal */}
            <AddItemModal
              onAddItem={onAddItem}
              handleCloseModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
            />
            {/* Item modal for previewing and deleting an item */}
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              closeActiveModal={closeActiveModal}
              handleDeleteClick={handleDeleteItem}
            />
            <RegisterModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              onSignUp={onSignUp}
            />

            <LoginModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              onLogIn={onLogIn}
            />
            <EditProfileModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              onEditProfile={onEditProfile}
            />
            {activeModal === "delete-garment" && (
              <DeleteConfirmModal
                activeModal={activeModal}
                handleCloseClick={closeActiveModal}
                onDelete={handleDeleteItem}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
