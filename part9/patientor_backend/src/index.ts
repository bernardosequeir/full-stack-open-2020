import express from 'express';
import cors from 'cors';

import diagnosticRouter from './routes/diagnoses'
import patientRouter from './routes/patients'

const app = express();
app.use(express.json());
app.use(cors())
const PORT = 3003;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnostics', diagnosticRouter)
app.use('/api/patients', patientRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

