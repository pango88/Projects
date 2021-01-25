import React from 'react';
import { HealthCheckEntry } from '../../types';
import { Icon, Container } from 'semantic-ui-react';

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  const heartIcon = () => {
    if (entry.healthCheckRating === 0) {
      return <Icon name="heart" color="green" />;
    } else if (entry.healthCheckRating <= 2) {
      return <Icon name="heart" color="yellow" />;
    } else {
      return <Icon name="heart" color="red" />;
    }
  };

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
    marginBottom: '1em'
  };

  return (
    <Container style={border}>
      <h3>
        {entry.date}
        <Icon name="doctor" size="large" />
      </h3>
      <p>
        <span style={styledP}>{entry.description}</span>
      </p>
      {heartIcon()}
    </Container>
  );
};

export default HealthCheckDetails;
