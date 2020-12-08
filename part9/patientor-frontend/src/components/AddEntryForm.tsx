import React, { useEffect, useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, DiagnosisSelection, LabelValue } from "../AddPatientModal/FormField";

import { Diagnosis, Entry, EntryType, HealthCheckRating } from "../types";
import Axios from "axios";
import { apiBaseUrl } from "../constants";

export type EntryFormValues = Omit<Entry, "id">;

const entryOptions: LabelValue[] = [
  { value: EntryType.HealthCheckEntry, label: "Health Check Entry" },
  { value: EntryType.HospitalEntry, label: "Hospital Entry" },
  { value: EntryType.OccupationalHealthcareEntry, label: "Occupational Healthcare Entry" }
];

const HealthCheckOptions: LabelValue[] = [
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.Healthy, label: "Healthy" }
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}
const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([]);
  const [type, setType] = useState<"HealthCheck" | "Hospital" | "OccupationalHealthcare">("HealthCheck");

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const { data: list } = await Axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);
      setDiagnosisList(list);
      console.log(list);

    };

    fetchDiagnosisList();
  }, []);
  useState();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: type,
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

        return (
          <Form className="form ui">
            <Field
              label="description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date Of Birth"
              placeholder="YYYY-MM-DD"
              name="dateOfBirth"
              component={TextField}
            />
            <Field
              label="diagnosisCode"
              placeholder="diagnosislist"
              name="occupation"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosisList)}
            />

            <SelectField
              label="Entry Type"
              name="type"
              options={entryOptions}
              handleChange={(event: any) => { setType(event.target.value); }}
            />


            {type === "Hospital" ? <><Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />

              <Field
                label="Discharge Criteria"
                placeholder="dunno, he looks well"
                name="dischargeCriteria"
                component={TextField}
              />

            </> : type === "HealthCheck" ?
                <SelectField
                  label="Health Check Rating"
                  name="healthCheck"
                  options={HealthCheckOptions}

                />

                : type === "OccupationalHealthcare" ? <p>aaa</p> : null
            }






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