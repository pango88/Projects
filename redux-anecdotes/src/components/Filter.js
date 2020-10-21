import React from 'react';
import { filterChange } from '../reducers/filterReducer';
import { connect } from 'react-redux';

const Filter = (props) => {

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    props.filterChange(event.target.value.toLowerCase());
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  filterChange,
};

const connectedFilter = connect(null, mapDispatchToProps)(Filter);
export default connectedFilter;
