import React, { useState, useEffect } from 'react';
import './info.css'

function HourlyForeCast(props) {
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        async function fetchHourlyForecast() {
            
            const apiKey = process.env.REACT_APP_climatekey;
            const city = props.city;
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                
                
                const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
                const hourlyForecast = data.list
                    .filter(item => item.dt_txt.startsWith(today))
                    .map(item => ({
                        time: item.dt_txt.split(' ')[1], 
                        temp: item.main.temp 
                    }));

                setForecast(hourlyForecast);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        fetchHourlyForecast();
    }, []);

    
    function formatTime(time24) {
        const [hours, minutes] = time24.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12; // Convert hour '0' to '12'
        return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    return (
        <div style={{marginTop:'30px',border:'4px groove black',borderRadius:'5px',background: 'linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)'}}>
            <h2 >Today's Hourly Temperature</h2>
            <ul className='HourBox'>
                {forecast.map((entry, index) => (
                    <li key={index} className='HourListItem'>
                        {formatTime(entry.time)}: {Math.round(entry.temp - 273.15)}°C
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { HourlyForeCast };
