import React from 'react'

const App = () => {
  const courses = 
    {
      name: "Half Stack application development",
      parts: [
        {name: "part 1", exercises: 10},
        {name: "part 2", exercises: 7},
        {name: "part 3", exercises: 14}
      ]
    }
    
    return (
    <>
      <Header courses={courses} />
      <Content courses={courses} />
      <Total courses={courses} />
    </>
  )
}

//Header Component
  const Header = (props) => {
      return(
        <h1>{props.courses.name}</h1>
      )
    }

    //content component
  const Content = (props) => {
    return(
      <>
        <Part name={props.courses.parts[0].name} exercises={props.courses.parts[0].exercises} />
        <Part name={props.courses.parts[1].name} exercises={props.courses.parts[1].exercises} />
        <Part name={props.courses.parts[2].name} exercises={props.courses.parts[2].exercises} />
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
      const total = props.courses.parts[0].exercises + props.courses.parts[1].exercises + props.courses.parts[2].exercises
    return(
      <p>Number of exercises {total}</p>
    )
  }

export default App
