import { useEffect, useState } from "react";
import { WeatherCard } from "./WeatherVisual";
import weatherIcon from './assets/weathericonpng.png';
import "./index.css"



function Page()
{
  

  const [city,Setcity] = useState('Latur');
  const [weatherType,setweatherType] = useState('clear sky');
  const [temp,setTemp] = useState('33');
  const [feels,setfeels] = useState('31');
  

    

  function SearchBar()
  {

    const [cityInput,setcityInput] = useState('');
    function cityInputHandler(e){
      setcityInput(e.target.value);
    }


      return (
      <div className="searchbar">
        <img src={weatherIcon} alt='weathericon' style={{height:'80px',width:'80px'}}/ >

          <div >
          <input type="text"
            placeholder="Enter City Name"
            onChange={cityInputHandler}
            value={cityInput}
            style={{height:'40px',width:'400px',marginTop:'10px'}}
            
            />
            <button type="button" className="btn btn-primary" 
            style={{marginBottom:'6px',height:'40px',marginRight:'200px',marginLeft:'10px'}}
            onClick={()=>Setcity(cityInput)}
            >
              Search
            </button>
          </div>
            
          </div>
      );

  }



  return(

<div className="Page">
  <SearchBar />

  <div className="body">
        

        <div className="left">
          
          <WeatherCard cityname={city} weathertype={weatherType} temperature={temp} feelslike={feels}/>
          {/*  Details */}
          {/*  HourlyForeCast */}
          

        </div>

        <div className="right">



        </div>

      </div>

</div>

    
  )
}

export {Page}