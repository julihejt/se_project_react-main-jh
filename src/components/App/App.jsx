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
import {
  getItems,
  deleteItem,
  onAddItem,
  likeCard,
  unlikeCard,
} from "../../utils/Api";
import DeleteConfirmationModal from "../DeleteConfirmModal/DeleteConfirmationModal";
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
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
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
        }
      })
      .catch(console.error);
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

    if (!isLiked) {
      likeCard(data._id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) =>
              item._id === data._id ? updatedCard.data : item
            )
          );
        })
        .catch(console.error);
    } else {
      unlikeCard(data._id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) =>
              item._id === data._id ? updatedCard.data : item
            )
          );
        })
        .catch(console.error);
    }
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    else setCurrentTemperatureUnit("C");
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    closeActiveModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    getCurrentUser(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((error) => {
        console.error(error);
        setIsLoggedIn(false);
      });
  }, []);

  // Escape key listener
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app__content">
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
            <AddItemModal
              onAddItem={handleAddItemModalSubmit}
              handleCloseModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={closeActiveModal}
              onDeleteItem={onDeleteItem}
              handleDeleteItem={handleDeleteItem}
            />
            <RegisterModal
              isOpen={activeModal === "signup"}
              closeActiveModal={closeActiveModal}
              onSignUp={onSignUp}
              openLoginModal={handleLoginModal}
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
            <DeleteConfirmationModal
              isOpen={activeModal === "deleteItem"}
              closeActiveModal={closeActiveModal}
              onDelete={onDeleteItem}
            />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
