import express from 'express';
import paitentService from '../services/patientService';
import { EntryType } from '../types';
import {
  isEntryType,
  toHealthEntry,
  toHospitalEntry,
  toNewPatient,
  toOccupationalEntry,
} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(paitentService.getPatients());
});

router.get('/:id', (req, res) => {
  // error handling?
  res.send(paitentService.getPatientById(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    // not sure why this would cause an error or need typing...
    const addedPatient = paitentService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

// Kinda messy router
router.post('/:id/entries', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newEntry = req.body;
  const id = req.params.id;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!newEntry || !newEntry.type || !isEntryType(newEntry.type)) {
    res.status(400).send('Missing entry/entry type or incorrect entry type');
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (newEntry.type === EntryType.Hospital) {
      const newHospitalEntry = toHospitalEntry(newEntry);
      const updatedPatient = paitentService.addEntry(id, newHospitalEntry);
      res.json(updatedPatient);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    else if (newEntry.type === EntryType.HealthCheck) {
      const newHealthEntry = toHealthEntry(newEntry);
      const updatedPatient = paitentService.addEntry(id, newHealthEntry);
      res.json(updatedPatient);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (newEntry.type === EntryType.OccupationalHealthcare) {
      const newOccupationalEntry = toOccupationalEntry(newEntry);
      const updatedPatient = paitentService.addEntry(id, newOccupationalEntry);
      res.json(updatedPatient);
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

export default router;
