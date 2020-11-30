interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface CalculatorValues {
  hoursList: Array<number>
  target: number
}

const parseArguments = (args: Array<string>): CalculatorValues => {
  if (args.length > 4) throw new Error('Too many arguments');
  if (args.length < 4) throw new Error('Not enough arguments');
  const numberArray = JSON.parse(args[2]);
  console.log(numberArray);

  if (Array.isArray(numberArray)) {
    if (numberArray.every(el => !isNaN(el))) {
      if (!isNaN(Number(args[3]))) {
        return {
          hoursList: numberArray.map(number => Number(number)),
          target: Number(args[3])
        };
      } else {
        throw new Error("The target isn't a number!");
      }
    } else {
      throw new Error("The array isn't filled with numbers");
    }
  } else {
    throw new Error("There isn't any array");
  }
};

export const exerciseCalculator = (dailyHours: Array<number>, targetAverage: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(day => day !== 0).length;
  const totalHours = dailyHours.reduce((total, hours) => total + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= targetAverage;
  const rating = success ? 3 : average >= (targetAverage / 2) ? 2 : 1;
  const ratingDescription = rating === 3
    ? "good job! keep it up"
    : rating === 2
      ? "not too bad but could be better"
      : "don't get discouraged, but you need some more work!";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAverage,
    average
  };
};

try {
  const { hoursList, target } = parseArguments(process.argv);
  console.log(exerciseCalculator(hoursList, target));
} catch (e) {
  console.log('ERROR : ', e.message);
}

