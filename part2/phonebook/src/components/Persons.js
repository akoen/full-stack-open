import React, { useState } from 'react';

const Persons = ({ persons, filter }) => {
  return (
    <div>
      {persons.map((i) =>
        i.name.toLowerCase().includes(filter) ? (
          <p key={i.name}>
            {i.name} {i.number}
          </p>
        ) : (
          ''
        ),
      )}
    </div>
  );
};

export default Persons;
