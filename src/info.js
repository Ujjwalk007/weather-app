import { useEffect, useState } from "react";
import { WeatherCard } from "./WeatherVisual";
import weatherIcon from './assets/weathericonpng.png';
import "./index.css"



function Page()
{
  

  const [city,Setcity] = useState('Latur');
  const [weatherType,setweatherType] = useState('');
  const [temp,setTemp] = useState(null);
  const [feels,setfeels] = useState(null);


  const [err,seterr] = useState(false);

  useEffect(()=>{

    async function fun()
    {
      const resp = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_climatekey}`)
      const data = await resp.json();

      
        setTemp((parseFloat(data.main.temp)-273).toFixed(1));
        setweatherType((data.weather[0].main).toLowerCase());
        setfeels((parseFloat(data.main.feels_like)-273).toFixed(1));

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
        
        console.log(data.name);
        


      }catch(err)
      {
        if(err)
          {
            console.log(err);
            seterr(true);
            setTimeout(() => {
              seterr(false);
            }, 3000);
    

          }
      }
      
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
            onClick={search}
            >
              Search
            </button>
          </div>
            
          </div>
      );

  }



  return(

    

<div className="Page">

      {
      err && (<div class="alert alert-warning" role="alert">
        Entered Invalid City !!
      </div>)
      }


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