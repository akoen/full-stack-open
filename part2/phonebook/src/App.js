import React, { useState, useEffect } from 'react';
import personService from './services/persons';

import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  const [banner, setBanner] = useState({ message: null, colour: 'red' });

  const hook = () => {
    personService.getPersons().then((persons) => setPersons(persons));
  };

  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification banner={banner} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setBanner={setBanner} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={filter} setBanner={setBanner} />
    </div>
  );
};

export default App;
