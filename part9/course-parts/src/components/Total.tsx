import React from 'react'

import { CourseInformation } from '../types'

interface TotalProps {
  courses: CourseInformation[]
}

const Total: React.FC<TotalProps> = ({ courses }) => {
  return <p>
    Number of exercises{" "}
    {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
}

export default Total