import "../WeatherCard/WeatherCard.css";
import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherOption =
    weatherOptions.find((option) => {
      return (
        option.day === weatherData.isDay &&
        option.condition === weatherData.condition
      );
    }) || defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  const convertTemperature = (tempF, unit) => {
    return unit === "C" ? ((tempF - 32) * 5) / 9 : tempF;
  };

  const temperature = convertTemperature(
    weatherData.temp.F,
    currentTemperatureUnit
  ).toFixed(1);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temperature} &deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption.url}
        alt={`Card showing ${weatherOption.day ? "day" : "night"} ${
          weatherOption.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
