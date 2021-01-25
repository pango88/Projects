import React from 'react';

const Total: React.FC<{ total: number }> = ({ total }) => {
  return <div>Number of exercises {total}</div>;
};

export default Total;
