
// new types
export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
export interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}
export interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CustomCoursePart extends CoursePartWithDescription {
  name: 'Custom'
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CustomCoursePart;

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};