import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  const hook = () => {
    personService.getPersons().then((persons) => setPersons(persons));
  };

  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  );
};

export default App;
