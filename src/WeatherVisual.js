import { useEffect, useState } from "react";



function WeatherCard(props)
{

    const [BackImg,setbackimg] =useState({});
    const [weather,setWeather] = useState('');

    

        useEffect(() => {
            switch (props.weathertype) {
              case 'clear sky':
                setWeather('clearsky.jpg');
                break;
              case 'few clouds':
                setWeather('fewclouds.jpg');
                break;
              case 'scattered clouds':
                setWeather('scatteredclouds.jpg');
                break;
              case 'broken clouds':
                setWeather('brokenclouds.jpg');
                break;
              case 'shower rain':
                setWeather('showerrain.jpg');
                break;
              case 'rain':
                setWeather('rain.jpg');
                break;
              case 'thunderstorm':
                setWeather('thunderstorm.jpg');
                break;
              case 'snow':
                setWeather('snow.jpg');
                break;
              case 'mist':
                setWeather('mist.jpg');
                break;
              default:
                setWeather('');
                break;
            }

          }, [props.weathertype]);

          useEffect(() => {
            if (weather) {
                const imageUrl = `${process.env.PUBLIC_URL}/src/assets/weathers/${weather}`;
                console.log('Setting background image to:', imageUrl);
                setbackimg({
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                });

            console.log(imageUrl);
          }}, [weather]);


        
    


    return(
        <div className="weathercard" style={BackImg}>

            <div>
            <label style={{fontFamily:'sans-serif',fontSize:'40px'}}>{props.cityname}</label>
            <br/>
            <label>{props.weathertype}</label>
            </div>

            <div>
                <label style={{fontFamily:'sans-serif',fontSize:'40px'}}>{props.temperature}&deg;C</label>
                <br/>
                <label>Feels Like:{props.feelslike}&deg;C</label>
            </div>


        </div>
    )

}

export {WeatherCard}