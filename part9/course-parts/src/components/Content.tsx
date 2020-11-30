import React from 'react'
import { CourseInformation } from '../types'

interface ContentProps {
  courses: CourseInformation[]
}

const Content: React.FC<ContentProps> = ({ courses }) => {
  return (
    <div>
      {courses.map(({ name, exerciseCount }) => <p key={name}>{name} {exerciseCount}</p>)}
    </div>
  )
}

export default Content