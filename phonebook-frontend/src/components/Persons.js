import React from 'react';
import Person from './Person';

const Persons = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((person, i) => (
        <Person
          key={i}
          person={person}
          handleDelete={() => handleDelete(person.id, person.name)}
        />
      ))}
    </ul>
  );
};

export default Persons;
