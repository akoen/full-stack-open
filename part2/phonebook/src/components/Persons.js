import React from 'react';
import personService from '../services/persons';

const Persons = ({ persons, filter, setPersons }) => {
  const deleteRecord = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(setPersons(persons.filter((i) => i.id !== person.id)));
    }
  };

  return (
    <div>
      {persons.map((i) =>
        i.name.toLowerCase().includes(filter) ? (
          <p key={i.name}>
            {i.name} {i.number}
            <button onClick={() => deleteRecord(i)}>delete</button>
          </p>
        ) : (
          ''
        ),
      )}
    </div>
  );
};

export default Persons;
