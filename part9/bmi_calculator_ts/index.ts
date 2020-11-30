import express from 'express';

import bmiCalculator from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

interface ExerciseRequest {
  daily_exercises: Array<number>,
  target: number
}

const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (isNaN(weight) || isNaN(height)) {
    res.json({
      error: "malformatted parameters"
    });
  } else {
    const bmi = bmiCalculator.calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  }
});

app.post('/exercises', (req, res) => {
  console.log(req.body);

  const request_values = req.body as ExerciseRequest;

  const result = exerciseCalculator(request_values.daily_exercises, request_values.target);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});