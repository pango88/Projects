class Result {
  periodLength = 0;
  trainingDays = 0;
  success = false;
  rating = 0;
  ratingDescription = '';
  target = 0;
  average = 0;
}

const parseList = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const arg1 = args.slice(3, args.length);
  const arr: number[] = [];
  for (let i = 0; i < arg1.length; i++) {
    arr.push(Number(arg1[i]));
  }

  if (!isNaN(Number(args[2])) && arr.every((i) => !isNaN(i))) {
    return {
      value1: arr,
      value2: Number(args[2]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (
  training: Array<number>,
  target: number
): Result => {
  const summary = new Result();
  summary.periodLength = training.length;
  for (let i = 0; i < training.length; i++) {
    if (training[i] !== 0) {
      summary.trainingDays += 1;
    }
  }
  summary.average = training.reduce((p, c) => p + c, 0) / training.length;
  if (summary.average >= target) {
    summary.success = true;
  } else {
    summary.success = false;
  }
  summary.target = target;

  if (summary.average >= target) {
    summary.rating = 3;
  } else if (summary.average < target / 2.5) {
    summary.rating = 1;
  } else {
    summary.rating = 2;
  }

  if (summary.rating === 1) {
    summary.ratingDescription = 'pretty bad';
  } else if (summary.rating === 2) {
    summary.ratingDescription = 'not too bad but could be better';
  } else {
    summary.ratingDescription = 'pretty good';
  }

  return summary;
};

try {
  const { value1, value2 } = parseList(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happend, message: ', error.message);
}

