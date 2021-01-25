import React from 'react';
import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { NewEntry, Patient } from '../types';
import { useStateValue, setPatient, addPatientEntry } from '../state';
import { useParams } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';

const IndividualPatient: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();

  const singlePatient = Object.values(patient).filter((p) => p.id === id)[0];

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntryPatient } = await axios.post<Patient[]>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addPatientEntry(newEntryPatient[0]));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromId } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromId));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [dispatch]);

  const genderIcon = () => {
    if (singlePatient.gender === 'male') {
      return <Icon name="mars" />;
    } else {
      return <Icon name="venus" />;
    }
  };

  if (!singlePatient) {
    return (
      <div>
        <Icon loading name="spinner" />
        <b>or the patient does not exist</b>
      </div>
    );
  }
  return (
    <div>
      <h2>
        {singlePatient.name}
        {genderIcon()}
      </h2>
      <p>ssn: {singlePatient.ssn}</p>
      <p>occupation: {singlePatient.occupation}</p>
      <EntryDetails entries={singlePatient.entries} />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default IndividualPatient;
