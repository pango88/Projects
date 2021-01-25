interface BmiValues {
  length: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      length: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const meters: number = height / 100;
  const bmi: number = weight / (meters * meters);

  if (bmi < 16) return 'Severly underweight';
  else if (bmi < 18.5) return 'Underweight';
  else if (bmi < 25) return 'Normal (healthy weight)';
  else if (bmi < 30) return 'Overweight';
  else if (bmi < 35) return 'Moderately obese';
  else if (bmi > 35) return 'Severly obese';
  else throw new Error('Incorrect arguments');
};

try {
  const { length, weight } = parseArguments(process.argv);
  console.log(calculateBmi(length, weight));
} catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', error.message);
}

export default calculateBmi;
