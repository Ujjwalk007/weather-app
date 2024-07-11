import React, { useEffect, useState } from 'react';
import './info.css';

const key = process.env.REACT_APP_climatekey;

function Weather() {
  const [city, setCity] = useState('Pune');
  const [cityName, setCityName] = useState('');
  const [weatherType, setWeatherType] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error , setError] = useState(null);

  async function getWeatherData() {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
      const data = await response.json();

      setCityName(data.name);
      setWeatherType(data.weather[0].main);
      setTemperature((parseFloat(data.main.temp) - 273.15).toFixed(2));
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setFeelsLike((parseFloat(data.main.feels_like) - 273.15).toFixed(2));
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching weather data:', error);
    }
  }

  useEffect(() => {
    getWeatherData();
  }, [city]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const changeCity = () => {
    setCity(inputValue);
  };

  return (
    <div className="weather-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name..."
          className="search-input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type='button' onClick={changeCity} className="search-button">Search</button>
      </div>
      {error ? (
        <div className="error-message">{error}</div>
       ) : (
          <>
          <div className="weather-info">
          <h2>{cityName}</h2>
          <h3>{weatherType}</h3>
        </div>

        <div className="weather-details">
          <div className="weather-detail">
            <h4>Temperature</h4>
            <p>{temperature} °C</p>
          </div>
          <div className="weather-detail">
            <h4>Humidity</h4>
            <p>{humidity} %</p>
          </div>
          <div className="weather-detail">
            <h4>Wind Speed</h4>
            <p>{windSpeed} m/s</p>
          </div>
          <div className="weather-detail">
            <h4>Feels Like</h4>
            <p>{feelsLike} °C</p>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

export { Weather };
