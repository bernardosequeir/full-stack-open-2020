import React, { useEffect, useState } from 'react';
import { Diagnosis, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { Segment } from 'semantic-ui-react';
interface Props {
  entry: Entry;
}
const BaseEntry: React.FC<Props> = ({ entry }) => {
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
      <p>{entry.date} {entry.description}</p>
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

export default BaseEntry;