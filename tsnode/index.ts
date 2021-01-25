import express from 'express';
import { calculateBmi } from './bmiCalculator';
// Importing these two calculators also calls them for some reason and its probably because o the try/catch in both of those files
import { calculateExercises } from './exerciseCalculator';
import { RequestCustom } from './@types';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight) {
    res
      .json({ error: 'missing argument height and/or weight, must be numbers' })
      .status(400);
  }
  res
    .json({
      height: height,
      weight: weight,
      bmi: calculateBmi(height, weight),
    })
    .status(200);
});

// One issue is that it still calls the funtion though

// Super messy guess :P But was such a hassle atm to get this all to work, so i dont know if i can be bothered to refactor this. Seeing as it works okay-ish :)
app.post('/exercise', (req: RequestCustom, res) => {
  const body = req.body;
  const dailyExercises = body.daily_exercises;
  const target = body.target;

  if (!dailyExercises || !target) {
    return res.json({ error: 'parameters missing' }).status(400);
  }
  if (!Array.isArray(dailyExercises) || isNaN(Number(target))) {
    return res.json({ error: 'malformatted parameters' }).status(400);
  }
  // Im using Array<number> here because i know it will be an array and it doesnt seem to matter whatever it contains
  for (let i = 0; i < (dailyExercises as Array<number>).length; i++) {
    if (isNaN((dailyExercises as Array<number>)[i])) {
      return res.json({ error: 'malformatted parameters' }).status(400);
    }
  }
  // At this point i can be certain that dailyExercises will be an array with numbers and target will be a number, i dont know if i could make this cleaner somehow but i got it to work so w/e
  return res
    .json(calculateExercises(dailyExercises as Array<number>, <number>target))
    .status(200);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
