import React, { useState } from 'react';
import personService from '../services/persons';

const PersonForm = (props) => {
  const { persons, setPersons, setBanner } = props;

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
        personService
          .replaceNumber(id, newPerson)
          .then((newRecord) => {
            setPersons(persons.map((i) => (i.id === id ? newRecord : i)));
            setTimeout(() => {
              setBanner({ message: null, colour: 'red' });
            }, 3000);
            setBanner({
              message: `The number for ${newPerson.name} has been updated`,
              colour: 'green',
            });
          })
          .catch(() => {
            setTimeout(() => {
              setBanner({
                message: `Information of ${newPerson.name} has already been removed from server.`,
                colour: 'red',
              });
            }, 3000);
            setBanner({ message: null, color: 'red' });
          });
      }
    } else {
      personService
        .addPerson(newPerson)
        .then((response) => {
          setTimeout(() => {
            setBanner({ message: null, colour: 'red' });
          }, 3000);
          setBanner({ message: `Added ${response.name}`, colour: 'green' });
          setPersons(persons.concat(response));
        })
        .catch((error) => {
          setTimeout(() => {
            setBanner({ message: null, colour: 'red' });
          }, 3000);
          console.log(error.response.data);
          setBanner({ message: error.response.data.error, colour: 'red' });
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
