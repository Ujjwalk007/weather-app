import { useEffect, useState } from 'react';

const key = '4103512bb36f877fe2d2bbf97cb3d386';

function Weather() {
  const [city, setCity] = useState('pune');
  const [cityName, setCityName] = useState('');
  const [weatherType, setWeatherType] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [inputValue, setInputValue] = useState('');

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
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Handle error state here if needed
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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0'
    }}>
      <div style={{
        padding: '15px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '400px',
        border: '1px solid black',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '14px',
        backgroundColor: 'white'
      }}>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <input
            type="text"
            placeholder="Enter city name..."
            style={{ padding: '8px', fontSize: '14px', marginRight: '10px' }}
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type='button' onClick={changeCity} style={{ padding: '8px 16px', fontSize: '14px' }}>Search</button>
        </div>

        <h2 style={{ fontSize: '16px', margin: '10px 0' }}>{cityName}</h2>
        <h3 style={{ fontSize: '14px', margin: '10px 0', color: '#666' }}>{weatherType}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '15px' }}>
          <div style={{ flex: '1 1 45%', border: '1px solid black', padding: '8px', fontSize: '12px' }}>
            <h4 style={{ fontSize: '14px', margin: '5px 0' }}>Temperature</h4>
            <p>{temperature} °C</p>
          </div>
          <div style={{ flex: '1 1 45%', border: '1px solid black', padding: '8px', fontSize: '12px' }}>
            <h4 style={{ fontSize: '14px', margin: '5px 0' }}>Humidity</h4>
            <p>{humidity} %</p>
          </div>
          <div style={{ flex: '1 1 45%', border: '1px solid black', padding: '8px', fontSize: '12px' }}>
            <h4 style={{ fontSize: '14px', margin: '5px 0' }}>Wind Speed</h4>
            <p>{windSpeed} m/s</p>
          </div>
          <div style={{ flex: '1 1 45%', border: '1px solid black', padding: '8px', fontSize: '12px' }}>
            <h4 style={{ fontSize: '14px', margin: '5px 0' }}>Feels Like</h4>
            <p>{feelsLike} °C</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Weather };
