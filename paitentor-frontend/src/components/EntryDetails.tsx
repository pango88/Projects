import React from 'react';
import HealthCheckDetails from './Entries/HealthCheckDetails';
import HospitalDetails from './Entries/HospitalDetails';
import OccupationalHealthcareDetails from './Entries/OccupationalHealthcareDetails';

import { Entry, assertNever } from '../types';

const EntryDetails: React.FC<{ entries: Entry[] | undefined }> = ({
  entries,
}) => {
  if (!entries || entries.length === 0) {
    return <b>Patient has no entries yet </b>;
  }
  return (
    <div>
      <h3>entries</h3>
      {entries.map((entry) => {
        switch (entry.type) {
          case 'HealthCheck':
            return <HealthCheckDetails entry={entry} />;
          case 'Hospital':
            return <HospitalDetails entry={entry} />;
          case 'OccupationalHealthcare':
            return <OccupationalHealthcareDetails entry={entry} />;
          default:
            return assertNever(entry);
        }
      })}
    </div>
  );
};

export default EntryDetails;
