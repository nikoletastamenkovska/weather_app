import React, { useState } from 'react'
const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }

  const dateBuilder = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != 'undefined')
      ? ((weather.main.temp > 16)
        ? 'App warm' : 'App')
      : 'App'}>
      <main>
        <div className='search_box'>
          <input
            type="text"
            className='search_bar'
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ?
          (
            <div>
              <div className='location_box'>
                <div className='location'>
                  {weather.name} {weather.sys.country}
                </div>
                <div className='date'>
                  {dateBuilder(new Date())}
                </div>
                <div className='weather_box'>
                  <div className='temp'>
                    {Math.round(weather.main.temp)}°C
                  </div>
                  <div className='weather'>{weather.weather[0].main}</div>
                </div>
              </div>
            </div>
          ) : ('')}

      </main>
    </div>
  );
}

export default App;
