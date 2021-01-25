/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  NewPatient,
  Gender,
  NewEntry,
  NewHospitalEntry,
  EntryType,
  NewHealthEntry,
  HealthCheckRating,
  NewOccupationalEntry,
} from './types';

const isString = (text: any): text is string =>
  typeof text === 'string' || text instanceof String;

const parseInformation = (information: any): string => {
  if (!information || !isString(information)) {
    throw new Error(`Incorrect or missing information: ${information}`);
  }
  return information;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGender = (param: any): param is Gender =>
  Object.values(Gender).includes(param);

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

export const toNewPatient = (object: any): NewPatient => ({
  name: parseInformation(object.name),
  dateOfBirth: parseDate(object.dateOfBirth),
  ssn: parseInformation(object.ssn),
  gender: parseGender(object.gender),
  occupation: parseInformation(object.occupation),
});

// Idk dude, messy code, could clean it up but atleast it works
export const isEntryType = (param: any): param is EntryType =>
  Object.values(EntryType).includes(param);

const parseHospital = (type: EntryType.Hospital): EntryType.Hospital => {
  if (!type || type !== 'Hospital') {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
};

const parseHealthCheck = (
  type: EntryType.HealthCheck
): EntryType.HealthCheck => {
  if (!type || type !== 'HealthCheck') {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating =>
  Object.values(HealthCheckRating).includes(param);

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (rating === undefined || !isHealthCheckRating(rating)) {
    throw new Error(`incorrect or missing rating: ${rating}`);
  }
  return rating;
};

const parseOccupational = (
  type: EntryType.OccupationalHealthcare
): EntryType.OccupationalHealthcare => {
  if (!type || type !== 'OccupationalHealthcare') {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
};

export const toBaseEntry = (object: any): NewEntry => ({
  description: parseInformation(object.description),
  date: parseDate(object.date),
  specialist: parseInformation(object.specialist),
  // Seeing as diagnosisCodes are optional i dont really know how to implement a nice way to parse it and the assignment didnt really mention it so i think this will do for now
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  diagnosisCodes: object.diagnosisCodes,
});

export const toHospitalEntry = (object: any): NewHospitalEntry => ({
  ...toBaseEntry(object),
  type: parseHospital(object.type),
  // this one might be weird
  // incorrect or missing information: undefined
  discharge: {
    date: parseDate(object.discharge.date),
    criteria: parseInformation(object.discharge.criteria),
  },
});

export const toHealthEntry = (object: any): NewHealthEntry => ({
  ...toBaseEntry(object),
  type: parseHealthCheck(object.type),
  healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
});

export const toOccupationalEntry = (object: any): NewOccupationalEntry => ({
  ...toBaseEntry(object),
  type: parseOccupational(object.type),
  employerName: parseInformation(object.employerName),
  // this one might be weird
  // incorrect or missing information: undefined
  sickLeave: {
    startDate: parseDate(object.sickLeave.startDate),
    endDate: parseDate(object.sickLeave.endDate),
  },
});

/****************/

export const generateId = (): string =>
  String(Number((Math.random() * 1000000).toFixed(0)));
