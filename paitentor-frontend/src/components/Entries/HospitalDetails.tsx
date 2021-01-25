import React from 'react';
import { HospitalEntry } from '../../types';
import { Icon, Container } from 'semantic-ui-react';

const HospitalDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
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
        <Icon name="hospital" size="large" />
      </h3>
      <p>
        <span style={styledP}>{entry.description}</span>
      </p>
      <p>
        discharged {entry.discharge.date} | {entry.discharge.criteria}
      </p>
    </Container>
  );
};

export default HospitalDetails;
