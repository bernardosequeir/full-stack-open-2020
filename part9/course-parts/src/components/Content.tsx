import React from 'react'
import { CoursePart, assertNever } from '../types'

interface ContentProps {
  courses: CoursePart[]
}

const Content: React.FC<ContentProps> = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        switch (course.name) {
          case "Deeper type usage":
            return (<p key={course.name}>{course.name} {course.exerciseCount} {course.description} {course.exerciseSubmissionLink}</p>)
          case "Using props to pass data":
            return (<p key={course.name}>{course.name} {course.groupProjectCount} {course.exerciseCount}</p>)
          case 'Fundamentals':
            return (<p key={course.name}>{course.name} {course.description} {course.exerciseCount}</p>)
          case 'Custom':
            return (<p key={course.name}>{course.name}</p>)
          default:
            assertNever(course)
        }
      }
      )}
    </div>
  )
}

export default Content