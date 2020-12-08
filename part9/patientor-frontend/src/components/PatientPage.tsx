import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry, Patient } from '../types';
import { Header, Icon, Button } from 'semantic-ui-react';
import HealthEntry from './HealthEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';
import AddEntryModal from './AddEntryModal';
import { EntryFormValues } from './AddEntryForm';
import { useStateValue, addPatient } from '../state';
const PatientPage = () => {
  const [, dispatch] = useStateValue();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const { id } = useParams<{ id: string }>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addPatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);

    }
  };

  useEffect(() => {

    const fetchPatientData = async () => {
      const { data: findPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      setPatient(findPatient);
    };

    fetchPatientData();
  }, [id]);

  if (!patient) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Header as="h2">{patient.name} {patient.gender === "male" ? <Icon className="mars icon" /> : <Icon className="venus icon" />}</Header>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Header as="h4">entries</Header>
      {patient.entries
        ? patient.entries.map(entry => {
          switch (entry.type) {
            case "HealthCheck":
              return <HealthEntry entry={entry} />;
            case "Hospital":
              return <HospitalEntry entry={entry} />;
            case "OccupationalHealthcare":
              return <OccupationalEntry entry={entry} />;

          }
        }) : <p>nothing yet!</p>
      }
      <AddEntryModal modalOpen={modalOpen} onSubmit={submitNewEntry} error={error} onClose={closeModal} />
      <Button onClick={() => openModal()}>Add New Entry</Button>

    </div>
  );
};

export default PatientPage;