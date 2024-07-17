import { useEffect, useState } from "react";

import clearsky from './assets/weathers/clearsky.jpg';
import fewclouds from './assets/weathers/fewclouds.jpg';
import scatteredclouds from './assets/weathers/scatteredclouds.jpg';
import brokenclouds from './assets/weathers/brokenclouds.jpg';
import showerrain from './assets/weathers/showerrain.jpg';
import rain from './assets/weathers/rain.jpg';
import thunderstorm from './assets/weathers/thunderstorm.jpg';
import snow from './assets/weathers/snow.jpg';
import mist from './assets/weathers/mist.jpg';

function WeatherCard(props) {
  const [BackImg, setbackimg] = useState({});

  useEffect(() => {
    switch (props.weathertype) {
      case 'clear':
        setbackimg({ backgroundImage: `url(${clearsky})`, backgroundSize: 'cover' });
        break;
      case 'clouds':
        setbackimg({ backgroundImage: `url(${fewclouds})`, backgroundSize: 'cover' });
        break;
      case 'scattered clouds':
        setbackimg({ backgroundImage: `url(${scatteredclouds})`, backgroundSize: 'cover' });
        break;
      case 'broken clouds':
        setbackimg({ backgroundImage: `url(${brokenclouds})`, backgroundSize: 'cover' });
        break;
      case 'shower rain':
        setbackimg({ backgroundImage: `url(${showerrain})`, backgroundSize: 'cover' });
        break;
      case 'rain':
        setbackimg({ backgroundImage: `url(${rain})`, backgroundSize: 'cover' });
        break;
      case 'thunderstorm':
        setbackimg({ backgroundImage: `url(${thunderstorm})`, backgroundSize: 'cover' });
        break;
      case 'snow':
        setbackimg({ backgroundImage: `url(${snow})`, backgroundSize: 'cover' });
        break;
      case 'mist':
        setbackimg({ backgroundImage: `url(${mist})`, backgroundSize: 'cover' });
        break;
      case 'haze':
        setbackimg({ backgroundImage: `url(${mist})`, backgroundSize: 'cover' });
        break;
      case 'dust':
        setbackimg({ backgroundImage: `url(${mist})`, backgroundSize: 'cover' });
        break;
      default:
        setbackimg({});
        break;
    }
  }, [props.weathertype]);

  return (
    <div className="weather-card-container">
      <div className="weather-card-main" style={BackImg}>
        <div>
          <h2 className="text-lg font-semibold">{props.cityname}</h2>
          <p className="text-gray-600">{props.weathertype}</p>
        </div>
        <div>
          <p className="text-4xl font-bold">{props.temperature}°C</p>
          <p className="text-sm">Feels Like: {props.feelslike}°C</p>
        </div>
      </div>
    </div>
  );
}

export { WeatherCard };
