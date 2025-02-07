import { useEffect, useState } from "react";
import { WeatherCard } from "./WeatherVisual";
import weatherIcon from './assets/weathericonpng.png';
import { Details } from "./Details";
import "./index.css"
import { HourlyForeCast } from "./Hourly";



function Page()
{
  

  const [city,Setcity] = useState('Latur');
  const [weatherType,setweatherType] = useState('');
  const [temp,setTemp] = useState(null);
  const [feels,setfeels] = useState(null);


  const [pressure,setPressure] = useState('');
  const [humidity,setHumidity] = useState('');
  const [wind,setwind] = useState('')

  const [sunrise,setsunrise] = useState('');
  const [sunset,setsunset] = useState('');


  const [err,setErr] = useState(false);

  useEffect(()=>{

    async function fun()
    {
      const resp = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_climatekey}`)
      const data = await resp.json();

      
        setTemp((parseFloat(data.main.temp)-273).toFixed(1));
        setweatherType((data.weather[0].main).toLowerCase());
        setfeels((parseFloat(data.main.feels_like)-273).toFixed(1));

        setHumidity(data.main.humidity);
        setwind(data.wind.speed);
        setPressure(data.main.pressure);

        let sunR = data.sys.sunrise;
        let sunS = data.sys.sunset;

        var sunrise_time = new Date(sunR*1000)
        var sunset_time = new Date(sunS*1000)

        const options = { hour: '2-digit', minute: '2-digit', hour12: true };


        const sunriseTime = sunrise_time.toLocaleTimeString('en-US', options);
        const sunsetTime = sunset_time.toLocaleTimeString('en-US', options);

        setsunrise(sunriseTime);
        setsunset(sunsetTime);

    }

    fun();

    
  },[]);

  
  

    

  function SearchBar()
  {

    const [cityInput,setcityInput] = useState('');
    function cityInputHandler(e){
      setcityInput(e.target.value);
    }

    async function search()
    {

     

      try{

        const resp = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${process.env.REACT_APP_climatekey}`)
        
        if(!resp.ok){
          throw new Error('City not found');
        }

        let data = await resp.json();

        Setcity(cityInput);
        setTemp((parseFloat(data.main.temp)-273).toFixed(1));
        setweatherType((data.weather[0].main).toLowerCase());
        setfeels((parseFloat(data.main.feels_like)-273).toFixed(1));

        setHumidity(data.main.humidity);
        setwind(data.wind.speed);
        setPressure(data.main.pressure);
        
        console.log(data.name);

        let sunR = data.sys.sunrise;
        let sunS = data.sys.sunset;

        var sunrise_time = new Date(sunR*1000)
        var sunset_time = new Date(sunS*1000)

        const options = { hour: '2-digit', minute: '2-digit', hour12: true };


        const sunriseTime = sunrise_time.toLocaleTimeString('en-US', options);
        const sunsetTime = sunset_time.toLocaleTimeString('en-US', options);

        setsunrise(sunriseTime);
        setsunset(sunsetTime);
        


      }catch(err)
      {
        if(err)
          {
            console.log(err);
            setErr(true);
            setTimeout(() => {
              setErr(false);
            }, 3000);
    

          }
      }
      
    }


      return (
        <header className="header">
      <div className="searchbar">
        <img src={weatherIcon} alt="weather icon" className="weather-icon" />
        <div className="search-input-container">
          <input
            type="search"
            placeholder="Enter City Name"
            onChange={cityInputHandler}
            value={cityInput}
            className="search-input"
          />
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.415l5.387 5.386a1 1 0 01-1.414 1.415l-5.386-5.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <button
          type="button"
          className="search-button"
          onClick={search}
        >
          Search
        </button>
      </div>
    </header>
      );

  }



  return(

    

<div className="Page">

  {err && (
    <div className="popup-message">
      <div className="popup-content">
        <p>Entered Invalid City!</p>
        <button onClick={() => setErr(false)}>Close</button>
      </div>
    </div>
  )}

  <SearchBar />

  <div className="body">
        

        <div className="left">
          
          <WeatherCard cityname={city} weathertype={weatherType} temperature={temp} feelslike={feels}/>
          <Details humidity={humidity} windspeed={wind} pressure={pressure} sunrise={sunrise} sunset={sunset}/>
          <HourlyForeCast city={city}/>
          

        </div>

        <div className="right">



        </div>

      </div>

      

</div>

    
  )
}

export {Page}