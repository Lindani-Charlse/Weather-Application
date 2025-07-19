import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.jpeg'
import clear_icon from '../assets/clear.jpeg'

const Weather = () => {

    const [weatherData, setWeatherData] = useState(false);

    const inputRef = useRef()

    const allIcons = {
        "01d": 'https://openweathermap.org/img/wn/01d@2x.png',
        "01n": 'https://openweathermap.org/img/wn/01n@2x.png',
        "02d": 'https://openweathermap.org/img/wn/02d@2x.png',
        "02n": 'https://openweathermap.org/img/wn/02n@2x.png',
        "03d": 'https://openweathermap.org/img/wn/03d@2x.png',
        "03n": 'https://openweathermap.org/img/wn/03n@2x.png',
        "04d": 'https://openweathermap.org/img/wn/04d@2x.png',
        "04n": 'https://openweathermap.org/img/wn/04n@2x.png',
        "09d": 'https://openweathermap.org/img/wn/09d@2x.png',
        "09n": 'https://openweathermap.org/img/wn/09n@2x.png',
        "10d": 'https://openweathermap.org/img/wn/10d@2x.png',
        "10n": 'https://openweathermap.org/img/wn/10n@2x.png',
        "13d": 'https://openweathermap.org/img/wn/13d@2x.png',
        "13n": 'https://openweathermap.org/img/wn/13n@2x.png',
    }

    const search = async (city)=>{

        if(city === ""){
            alert("Please provide your city name");
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        
            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);

            const icon = allIcons[data.weather[0].icon] || clear_icon

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            })
        } catch (error) {
            setWeatherData(false);
            console.log("Error in fetching weather data");
        }
    }

    useEffect(()=>{
        search("")
    },[])

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='search'/>
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>

      {weatherData?<>
        <img src= {weatherData.icon} alt="" className='weather-icon' />
        
        <p className='temp'>{weatherData.temperature}°c</p>
        
        <p className='city'>{weatherData.location}</p>
        
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>

        </div>
      </>:<></>}
    </div>
  )
}

export default Weather
