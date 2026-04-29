import { useState } from 'react'

const Course = ({course}) => {
  const {name, parts} = course
  let total = 0

  return(
    <>
      <h1>{name}</h1>
      {parts.map(part => <h3>{part.name} {part.exercises}</h3>)}
      <h3>Total of <strong>{parts.reduce((sum, part) => sum + part.exercises, 0)} </strong>exercises</h3>
    </>
  )
}

const App = () => {
  const course = {
    id:1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <Course course={course} />
  )
}

export default App
