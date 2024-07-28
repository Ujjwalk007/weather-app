import './index.css'


function Details(props)
{




    return (
        <div className='details' >

            {/* <div>
                <label>Precipitation</label><br/>
                <label>{props.precipitaion}</label>
            </div> */}

            <div>
                <label>Humidity</label><br/>
                <label>{props.humidity}%</label>
            </div>

            <div>
                <label>Wind</label><br/>
                <label>{props.windspeed} km/h</label>
            </div>

            <div>
                <label>Atmospheric Pressure</label><br/>
                <label>{props.pressure} hPa</label>
            </div>

            <div>
                <label>Sunrise</label><br/>
                <label>{props.sunrise}</label>
            </div>

            <div>
                <label>Sunset</label><br/>
                <label>{props.sunset}</label>
            </div>

        </div>
    )
}

export {Details}