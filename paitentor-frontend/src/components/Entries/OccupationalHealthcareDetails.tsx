import React from 'react';
import { OccupationalHealthcareEntry } from '../../types';
import { Icon, Container } from 'semantic-ui-react';

const OccupationalHealthcareDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  // Wonky styles atm, but dont wanna spend much time with this so whatever
  const styledP = {
    color: 'grey',
    fontStyle: 'italic',
  };

  const border = {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#DCDCDC',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '1em',
  };

  return (
    <Container style={border}>
      <h3>
        {entry.date}
        <Icon name="stethoscope" size="large" />
        {entry.employerName}
      </h3>
      <p>
        <span style={styledP}>{entry.description}</span>
      </p>
    </Container>
  );
};

export default OccupationalHealthcareDetails;
