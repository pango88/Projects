import patientData from '../../data/patients';
import { generateId } from '../utils';

import { PatientNoSsn, Patient, NewPatient, NewEntry } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): PatientNoSsn[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const getPatientById = (id: string): (Patient | null)[] => {
  const patient = patients.filter((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): PatientNoSsn => {
  const newPatient = {
    id: generateId(),
    // temporary fix
    entries: [],
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

/// temporary
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addEntry = (id: string, entry: NewEntry) => {
  const patient: Patient[] = patients.filter((p) => p.id === id);
  const updatedPatient = {
    ...patient[0],
    entries: patient[0].entries.concat({ id: generateId(), ...entry }),
  };
  patients.map((p, i) =>
    p.id === id ? patients.splice(i, 1, updatedPatient) : p
  );
  return [updatedPatient];
};

export default { getPatients, addPatient, getPatientById, addEntry };
