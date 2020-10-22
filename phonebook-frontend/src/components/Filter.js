import React from 'react';

const Filter = ({ filter }) => {
  return (
    <div>
      filter shown with <input onChange={filter} />
    </div>
  );
};

export default Filter;
