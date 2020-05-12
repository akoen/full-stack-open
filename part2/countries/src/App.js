import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const ZERO_CELSIUS = 273.15;

const CountryToggle = ({ country, expanded, setExpanded }) => {
  return (
    <div>
      {country.name}
      <button onClick={() => setExpanded(!expanded)}>show</button>
    </div>
  );
};

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState({
    main: { temp: undefined },
    weather: [{ icon: undefined }],
    wind: { speed: undefined, deg: undefined },
  });

  const hook = () => {
    const request = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${API_KEY}`;
    console.log(request);
    axios.get(request).then((response) => {
      setWeather(response.data);
    });
  };

  useEffect(hook, []);

  return (
    <div>
      <h1>{country.name}</h1>
      capital {country.capital}
      <br />
      population {country.population}
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} style={{ width: 150 }} />
      <h2>Weather in {country.capital}</h2>
      <div>
        <b>temperature:</b> {(weather.main.temp - ZERO_CELSIUS).toFixed(1)} Celsius
      </div>
      <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} />
      <div>
        <b>wind:</b> {weather.wind.speed} m/s direction {weather.wind.deg} deg.
      </div>
    </div>
  );
};

const Country = ({ country, numCountries }) => {
  const [expanded, setExpanded] = useState(false);

  if (numCountries === 1) return <CountryDetail country={country} />;
  else if (expanded)
    return (
      <>
        <CountryToggle country={country} expanded={expanded} setExpanded={setExpanded} />
        <CountryDetail country={country} />
      </>
    );
  else {
    return (
      <div key={country.name}>
        <CountryToggle country={country} expanded={expanded} setExpanded={setExpanded} />
      </div>
    );
  }
};

function App() {
  const [search, setSearch] = useState('sw');
  const [countries, setCountries] = useState([]);

  const hook = () => {
    axios.get('http://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  const filterCountries = (array) => {
    const matches = array.filter((i) => i.name.toLowerCase().includes(search));
    const length = matches.length;

    if (length < 10)
      return matches.map((country) => (
        <Country key={country.name} country={country} numCountries={length} />
      ));
    else return 'Too many matches, specify another filter';
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div>
        find countries
        <input value={search} onChange={handleSearch} />
      </div>
      <div>{filterCountries(countries)}</div>
    </>
  );
}

export default App;
