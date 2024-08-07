import "../Header/header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleCardClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="wtwr logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
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
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__user-name">Terrance Tegegne</p>
          <img
            src={avatar}
            alt="Terrance Tegegne"
            className="header__user-avatar"
          />
        </div>
      </Link>
    </header>
  );
}

export default Header;
