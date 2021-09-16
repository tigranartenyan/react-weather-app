import './App.css';
import React, {useState} from 'react';

const API = {                                       //объект с ключом api
  key: "e7c1cd8d36b98a30bc2e67998cfeb562",
  base: "https://api.openweathermap.org/data/2.5/"
}

const convertTimeStamp = (timestamp) => {           //функция конвертации из милисекунд в часы и минуты
  let d = new Date(timestamp * 1000);
  let hours = d.getHours();
  let minutes = ('0' + d.getMinutes()).slice(-2);

  let time = `${hours} : ${minutes}`;
  return time;
}

function App() {
  const [query, setQuery] = useState('');           //стейт для городов
  const [weather, setWeather] = useState({});       //стейт для записи результата погоды
  
  const search = evt => {                           //поиск города и вывод результата 
    if(evt.key === "Enter") {
      fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}&lang=ru`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('')
        console.log(result)
      });
    }
  }
  const dateBuilder = (d) => {                      //функция получения сегодняшней даты
    let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  } 
  
  return (
    //если температура выше 16 градусов, меняется задний фон
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16)  ? 'app warm' : 'app') : 'app'}>   
      <main>
        <div className="search-box">
          <input 
          type="text" 
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value = {query}
          onKeyPress = {search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
          <div className="location">{weather.name}</div> 
          <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°c</div>
          <div className="weather">{weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}</div>
          <div className="feels-like">Ощущается {Math.round(weather.main.feels_like)}°c</div>
          <div className="humidity">Влажность {weather.main.humidity}%</div>
          <div className="min-temp">Мин.температура {`${Math.round(weather.main.temp_min)}°c`}</div>
          <div className="max-temp">Макс.температура {`${Math.round(weather.main.temp_max)}°c`}</div>
          <div className="sunrise">Восход {convertTimeStamp(weather.sys.sunrise)}</div>
          <div className="sunset">Закат {convertTimeStamp(weather.sys.sunset)}</div>
          <div className="wind">Ветер {Math.round(weather.wind.speed)} м/с</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
