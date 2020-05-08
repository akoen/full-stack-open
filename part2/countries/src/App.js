import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('switze');
  const [countries, setCountries] = useState([]);

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterCountries = (array) => {
    const matches = array.filter((i) => i.name.toLowerCase().includes(search));
    const length = matches.length;

    if (length === 1) {
      const country = matches[0];
      return (
        <div>
          <h1>{country.name}</h1>
          capital {country.capital}
          <br />
          population {country.population}
          <h2>languages</h2>
          <ul>
            {country.languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img src={country.flag} style={{ width: 150 }} />
        </div>
      );
    } else if (length < 10) return matches.map((i) => <p key={i.name}>{i.name}</p>);
    else return 'Too many matches, specify another filter';
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
