import { useState } from "react";
import { WeatherCard } from "./WeatherVisual";



function Body()
{

  const [city,Setcity] = useState('Latur');

  function SearchBar()
  {

      return (
      <div className="searchbar">



      </div>
      );

  }



  return(

<div className="Page">
  <SearchBar />

  <div className="body">
        

        <div className="left">
          
          <WeatherCard />
          {/*  Details */}
          {/*  HourlyForeCast */}
          

        </div>

        <div className="right">



        </div>

      </div>

</div>

    
  )
}