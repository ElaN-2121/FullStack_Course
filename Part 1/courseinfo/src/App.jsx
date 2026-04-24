import React from 'react'

const App = () => {
  const course = "Half Stack application development"
  const parts = [
    {name: "part 1", exercises: 10},
    {name: "part 2", exercises: 7},
    {name: "part 3", exercises: 14}
  ]

    return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

//Header Component
  const Header = (props) => {
      return(
        <h1>{props.course}</h1>
      )
    }

    //content component
  const Content = (props) => {
    return(
      <>
        <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
        <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
        <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
      </>
    )
  }

  //parts component
  const Part = (props) => {
    return(
      <p>{props.name} {props.exercises}</p>
    )
  }

  //total component
    const Total = (props) => {
      const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
    return(
      <p>Number of exercises {total}</p>
    )
  }

export default App
