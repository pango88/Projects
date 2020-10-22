import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Country from './components/Country';
import Filter from './components/Filter';

import './index.css';

function App() {
  const [newFilter, setNewFilter] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [countryShow, setCountryShow] = useState([]);

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountryData(response.data);
      setCountryShow(response.data);
    });
  };

  useEffect(hook, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase());
    setCountryShow([]);
  };

  let countriesToShow = countryData.filter(
    (country) => country.name.toLowerCase().match(newFilter) !== null
  );

  if ((countryShow.length || countriesToShow.length) === 1) {
    return (
      <div>
        <Filter handleFilterChange={handleFilterChange} />
        {countryShow.length === 1 ? (
          <Country country={countryShow} />
        ) : (
          <Country country={countriesToShow} />
        )}
      </div>
    );
  } else if (countriesToShow.length > 10) {
    return (
      <div>
        <Filter handleFilterChange={handleFilterChange} />
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }
  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <ul>
        {countriesToShow.map((country, i) => (
          <li key={i}>
            {country.name}
            <button
              onClick={() => {
                countriesToShow = [country];
                setCountryShow([country]);
              }}
            >
              show
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
