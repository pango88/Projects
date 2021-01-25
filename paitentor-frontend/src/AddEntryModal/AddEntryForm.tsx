import React, { useState } from 'react';
import { Grid, Button, Form as styledForm } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import {
  TextField,
  DiagnosisSelection,
  NumberField,
} from '../AddPatientModal/FormField';
import { SelectField, EntryTypeOption } from './FormField';
import { NewEntry, EntryType } from '../types';
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: 'Health Check' },
  { value: EntryType.OccupationalHealthcare, label: 'Occupational Healthcare' },
  { value: EntryType.Hospital, label: 'Hospital' },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();
  const [type, setType] = useState('HealthCheck');

  const typeFormFields = () => {
    if (type === 'HealthCheck') {
      return (
        <Field
          label="healthCheckRating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
    } else if (type === 'OccupationalHealthcare') {
      return (
        <>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <styledForm.Group widths="equal">
            <Field
              label="Sick leave: Start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave: End date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
          </styledForm.Group>
        </>
      );
    } else if (type === 'Hospital') {
      return (
        <styledForm.Group widths="equal">
          <Field
            label="Discharge: Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge: Criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </styledForm.Group>
      );
    }
  };

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [''],
      }}
      onSubmit={onSubmit}
      // Im not validating the extra properties of each entry since they dont exist on initial values, I won't fix this for now...
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, setFieldValue, setFieldTouched, handleChange, dirty }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              handleChange={handleChange}
              options={entryTypeOptions}
              setType={setType}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            {typeFormFields()}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
