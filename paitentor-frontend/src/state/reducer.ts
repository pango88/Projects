import { State } from './state';
import { Diagnosis, Patient } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_PATIENT';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT_ENTRY';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_PATIENT':
      return {
        ...state,
        patient: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patient,
        },
      };
    case 'ADD_PATIENT_ENTRY':
      return {
        ...state,
        patient: {
          ...state.patient,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({
              ...memo,
              [diagnose.code]: diagnose,
            }),
            {}
          ),
          ...state.diagnosis,
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  };
};

export const setPatient = (patient: Patient[]): Action => {
  return {
    type: 'SET_PATIENT',
    payload: patient,
  };
};

export const addPatientEntry = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT_ENTRY',
    payload: patient,
  };
};

export const setDiagnosisList = (diagnosis: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnosis,
  };
};
