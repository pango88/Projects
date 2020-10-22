import React from 'react';

const Person = ({ person, handleDelete }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={handleDelete}>delete</button>
    </li>
  );
};

export default Person;
