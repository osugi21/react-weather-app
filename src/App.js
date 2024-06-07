import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  
  const [currentWeather, setCurrentWeather] = useState({});
  const [weekWeather, setWeekWeather] = useState([]);
  const [city, setCity] = useState("");
  const [addText, setAddText] = useState("")
  const [weatherIcon , setWeatherIcon] = useState({})

  
  const getWeather = () => {
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4fee4b35d6fdd1377d5dffd2d1f3ebe5&units=metric&lang=ja`)
  .then(response => {
    setWeatherIcon({icon: response.data.weather[0].icon})
    setCurrentWeather({
      description: response.data.weather[0].description,
      temp: response.data.main.temp,
      time: new Date(response.data.dt * 1000).toLocaleString()
    });
    
console.log(setWeatherIcon)
console.log(response)
  })

  .catch(error => {
    setAddText("検索不可");
    setCurrentWeather({});
    setWeatherIcon({icon: "09n"})
    alert("入力した都市名は誤りです")
  });
  
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4fee4b35d6fdd1377d5dffd2d1f3ebe5&units=metric&lang=ja`)
    .then(response => {
      setWeekWeather(response.data.list)
       console.log()
    })
    .catch(error => {
      setAddText("検索不可");
      setWeekWeather([]);
    });
  }

  const inputText = (e) => {
    setCity(e.target.value)
  }

  const handleClick = (e) => {
    setAddText(city);
    getWeather();
    setCity("");
  }
  console.log()

  return (
    <div className='App'>
      <div className='input'>
        <input type='text' value={city} onChange={inputText} placeholder='都市名を入力'/>
        <button onClick={handleClick}>🔍</button>
      </div>
      <div className='now'>
        <div className='weather-now'>
          <h2>{addText ? addText + "の天気": "現在の天気"}</h2>
        </div>
        <div className='now-time'>
          <div>
            {addText ? <img src={`https://openweathermap.org/img/wn/${weatherIcon.icon}@2x.png`} /> : null}
          </div>
          <div>
        {currentWeather.time && (
          <div>
            {currentWeather.time} - {currentWeather.description}, 気温: {currentWeather.temp}℃
          </div>
        )
      }
      </div>
        </div>
      </div>
      <div className='week'>
        <div className='week-weather'>
          <h3>{addText ? "3時間ごとの" + addText + "の天気" : "3時間ごとのその都市の天気"}</h3>
        </div>
      <ul className='week-time'>
          {weekWeather.slice(0, 9).map((weather, index) => (
            <li key={index}>
              {new Date(weather.dt * 1000).toLocaleString()} - {weather.weather[0].description}, 気温: {weather.main.temp}°C
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
