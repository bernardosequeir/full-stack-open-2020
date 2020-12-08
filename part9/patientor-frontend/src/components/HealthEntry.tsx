import React, { useEffect, useState } from 'react';
import { Diagnosis, HealthCheckEntry } from '../types';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { Header, Icon, Segment } from 'semantic-ui-react';
interface Props {
  entry: HealthCheckEntry;
}
const HealthEntry: React.FC<Props> = ({ entry }) => {
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[] | null>(null);
  useEffect(() => {
    const fetchDiagnosis = async () => {

      const { data: diagnosis } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);

      setDiagnosisList(diagnosis);
    };

    fetchDiagnosis();


  }, [entry]);


  const heartIcon = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return <Icon className="yellow heart" />;
      case 1:
        return <Icon className="blue heart" />;
      case 2:
        return <Icon className="red heart" />;
      case 3:
        return <Icon className="black heart" />;
    }
  };

  return (
    <Segment>
      <Header as="h3">{entry.date} <Icon className="user doctor" /></Header>
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
      {heartIcon()}
    </Segment>
  );
};

export default HealthEntry;