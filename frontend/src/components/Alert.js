import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
  const alert = useSelector((state) => state.alert);

  if (alert === null) {
    return null;
  }

  return <div className="alert">{alert.message}</div>;
};

export default Alert;
