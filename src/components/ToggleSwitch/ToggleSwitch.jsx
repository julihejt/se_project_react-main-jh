import React, { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

// Defining the ToggleSwitch functional component
const ToggleSwitch = () => {
  // Using the useContext hook to access currentTemperatureUnit and handleToggleSwitchChange from CurrentTemperatureUnitContext
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    // Label element that acts as a container for the toggle switch
    <label className="switch">
      {/* Input element for the checkbox, triggers handleToggleSwitchChange on change */}
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />

      {/* Span element representing the slider, changes class based on the current temperature unit */}
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      >
        {/* Displaying the current temperature unit inside the slider */}
        {currentTemperatureUnit}
      </span>
    </label>
  );
};

// Exporting the ToggleSwitch component as the default export
export default ToggleSwitch;
