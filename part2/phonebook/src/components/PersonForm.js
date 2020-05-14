import React, { useState } from 'react';
import axios from 'axios';

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

    if (persons.map((i) => i.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    axios.post('http://localhost:3002/persons', newPerson).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName('');
      setNewNumber('');
    });
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
