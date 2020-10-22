import React from 'react';

const Filter = ({ handleFilterChange }) => {
  return (
    <p>
      find countries <input onChange={handleFilterChange} />
    </p>
  );
};

export default Filter;
