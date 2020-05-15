import React, { useState } from 'react';
import axios from 'axios';
import personService from '../services/persons';

const PersonForm = (props) => {
  const { persons, setPersons } = props;

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addNewPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.map((i) => i.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const id = persons.find((i) => i.name === newName).id;
        personService.replaceNumber(id, newPerson).then((newRecord) => {
          setPersons(persons.map((i) => (i.id === id ? newRecord : i)));
        });
      }
    } else {
      personService.addPerson(newPerson).then((response) => {
        setPersons(persons.concat(response));
      });
    }

    setNewName('');
    setNewNumber('');
  };

  return (
    <>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
