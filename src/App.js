import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  
  const [currentWeather, setCurrentWeather] = useState({});
  const [weekWeather, setWeekWeather] = useState([]);
  const [city, setCity] = useState("");
  const [addText, setAddText] = useState("")

  
  const getWeather = () => {
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4fee4b35d6fdd1377d5dffd2d1f3ebe5&units=metric&lang=ja`)
  .then(response => {
    setCurrentWeather({
      description: response.data.weather[0].description,
      temp: response.data.main.temp,
      time: new Date(response.data.dt * 1000).toLocaleString()
    });

    // console.log(response)
  })
  .catch(error => {
    console.error('リクエストエラー:', error);
  });
  
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4fee4b35d6fdd1377d5dffd2d1f3ebe5&units=metric&lang=ja`)
    .then(response => {
      setWeekWeather(response.data.list)
       console.log()
    })
    .catch(error => {
      console.error('リクエストエラー:', error);
    });
  }

  const inputText = (e) => {
    setCity(e.target.value)
  }

  const handleClick = (e) => {
    setAddText(city);
    getWeather();
  }
  
  return (
    <div>
      <div>
        <input type='text' value={city} onChange={inputText} />
        <button onClick={handleClick}>🔍</button>
      </div>
      <div>
        <div>
          <h2>{city}の天気</h2>
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
      <div>
        <div>
          <h3>3時間ごとの{city}の天気</h3>
        </div>
      <ul>
          {weekWeather.slice(0, 9).map((weather, index) => (
            <li key={index}>
              {new Date(weather.dt * 1000).toLocaleString()} - {weather.weather[0].description}, 気温: {weather.main.temp}°C
            </li>
          ))}
        </ul>
        {/* 検索された場所の一時間ごとの天気を取得 */}
      </div>
    </div>
  );
}

export default App;
