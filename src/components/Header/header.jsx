import "../Header/header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function Header({
  handleCardClick,
  weatherData,
  handleLoginModal,
  handleRegisterModal,
  isLoggedIn,
}) {
  const { name, avatar } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header_wrapper">
        <Link to="/">
          <img src={logo} alt="wtwr logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__toggle-switch-container">
        <ToggleSwitch />
      </div>
      <button
        onClick={handleCardClick}
        type="button"
        className="header__add-btn"
      >
        + Add clothes
      </button>

      {isLoggedIn ? (
        <Link to="/profile">
          <div className="header__user-container">
            <p className="header__username">{name}</p>

            <img src={avatar} alt={name} className="header__avatar" />
          </div>
        </Link>
      ) : (
        <>
          <button
            onClick={handleCardClick}
            type="button"
            className="header_signup-button"
          >
            Sign up
          </button>
          <button
            onClick={handleCardClick}
            type="button"
            className="header_login-button"
          >
            Log In
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
