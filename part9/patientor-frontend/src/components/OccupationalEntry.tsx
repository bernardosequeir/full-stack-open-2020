import React, { useEffect, useState } from 'react';
import { Diagnosis, OccupationalHealthcareEntry } from '../types';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { Header, Icon, Segment } from 'semantic-ui-react';
interface Props {
  entry: OccupationalHealthcareEntry;
}
const OccupationalEntry: React.FC<Props> = ({ entry }) => {
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[] | null>(null);
  useEffect(() => {
    const fetchDiagnosis = async () => {

      const { data: diagnosis } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);

      setDiagnosisList(diagnosis);
    };

    fetchDiagnosis();


  }, [entry]);




  return (
    <Segment>
      <Header as="h3">{entry.date} <Icon className="stethoscope" /></Header>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes && diagnosisList
          ? entry.diagnosisCodes
            .map(diagnosis =>
              <li key={diagnosis}>{diagnosis} {diagnosisList?.find(d => d.code === diagnosis)?.name}</li>
            )
          : null
        }
      </ul>

    </Segment>
  );
};

export default OccupationalEntry;