import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "../App/App.css";
import { coordinates, APIKey } from "../../utils/constants";
import Header from "../Header/header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, deleteItem, onAddItem } from "../../utils/Api";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";

import { signUp, signIn, getCurrentUser, editProfile } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
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

  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

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

  const handleDeleteItem = () => {
    setActiveModal("deleteItem");
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

  console.log(JSON.stringify(clothingItems));

  // Function to handle adding a new item
  const handleAddItemModalSubmit = (values) => {
    return onAddItem({ ...values, token: localStorage.getItem("jwt") }).then(
      (item) => {
        setClothingItems((prev) => [item.data, ...prev]);
        closeActiveModal();
      }
    );
  };

  const onDeleteItem = (_id) => {
    const headers = localStorage.getItem("jwt");
    deleteItem(selectedCard._id, headers)
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

  const onSignUp = (data) => {
    signUp(data)
      .then(() => {
        onLogIn(data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onLogIn = (data) => {
    signIn(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setCurrentUser(res.user);
          closeActiveModal();
        } else {
          console.error("Login failed. No token received.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  const onEditProfile = (data) => {
    const token = localStorage.getItem("jwt");
    editProfile(data, token)
      .then((res) => {
        setCurrentUser(res.data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (data, isLiked) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    if (!isLiked) {
      likeCard(data, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === data._id ? updatedCard : item))
          );
        })
        .catch(console.error);
    } else {
      unlikeCard(data, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === data._id ? updatedCard : item))
          );
        })
        .catch(console.error);
    }
  };

  // Function to handle toggle switch change
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    else setCurrentTemperatureUnit("C");
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    closeActiveModal();
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
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
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
              handleAddClick={handleAddClick}
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
                      handleLogOutClick={handleLogOutClick}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
            <Footer />
            {/* Conditional rendering for AddItemModal */}
            <AddItemModal
              onAddItem={handleAddItemModalSubmit}
              handleCloseModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
            />
            {/* Item modal for previewing and deleting an item */}
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={closeActiveModal}
              onDeleteItem={onDeleteItem}
            />
            <RegisterModal
              isOpen={activeModal === "signup"}
              closeActiveModal={closeActiveModal}
              onSignUp={onSignUp}
              openLoginModal={handleLoginModal} // Pass this function
            />

            <LoginModal
              isOpen={activeModal === "login"}
              closeActiveModal={closeActiveModal}
              onLogIn={onLogIn}
              openRegisterModal={handleRegisterModal}
            />
            <EditProfileModal
              isOpen={activeModal === "editprofile"}
              closeActiveModal={closeActiveModal}
              onEditProfile={onEditProfile}
            />

            <DeleteConfirmModal
              isOpen={activeModal === "delete-garment"}
              handleCloseClick={closeActiveModal}
              onDelete={onDeleteItem}
            />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
