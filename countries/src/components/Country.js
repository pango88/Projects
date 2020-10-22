// The api mapping is not the best, since darksky require lat,long to do a api call and restcountries only provide lat,long for the whole country so when the app displays the weather it displays it for "random-ish" coordinates, usually located somewhere in the middle of the country
// I am aware react-skycons may cause some errors in the console, however since this is just for own usage i will refrain from doing anything about it

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skycons from 'react-skycons';

const api_key = process.env.REACT_APP_API_KEY;
const proxy = 'https://cors-anywhere.herokuapp.com/';

const Country = ({ country }) => {
  const [countryWeather, setCountryWeather] = useState({
    currently: {
      // placeholders
      time: 'loading',
      icon: 'CLOUDY',
    },
  });

  const weather = countryWeather.currently;
  // c for current country, maybe not best naming convetion but since it is a fairly small component i deem it valid
  const c = country[0];
  const lat = c.latlng[0];
  const long = c.latlng[1];

  const hook = () => {
    axios
      .get(
        `${proxy}https://api.darksky.net/forecast/${api_key}/${lat},${long}?units=si`
      )
      .then((response) => {
        console.log('hooki promise fulfilled');
        console.log(response);
        setCountryWeather(response.data);
      });
  };

  useEffect(hook, []);

  return (
    <div>
      <h1>{c.name}</h1>
      <p>capital {c.capital}</p>
      <p>population {c.population}</p>
      <h2>languages</h2>
      <ul>
        {c.languages.map((language, i) => (
          <li key={i}>{language.name}</li>
        ))}
      </ul>
      <img src={c.flag} height="150px" alt={`Flag of ${c.name}`} />
      <h2>Weather in {c.name}</h2>
      <h3>
        Coordinates: {lat}, {long}
      </h3>
      <p>temperature: {weather.temperature} celsius </p>
      <p>{weather.icon.replace(/-/g, ' ')}</p>
      <Skycons
        style={{ height: '5rem', width: '9rem' }}
        color="black"
        icon={weather.icon.replace(/-/g, '_').toUpperCase()}
        autoplay={true}
      />
      <p>wind: {weather.windSpeed} m/s (meter per second)</p>
    </div>
  );
};

export default Country;
