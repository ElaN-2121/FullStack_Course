const Course = ({course}) => {
  const {name, parts} = course
  let total = 0

  return(
    <>
      <h1>{name}</h1>
      {parts.map(part => (
        <h3 key={part.id}>
          {part.name} {part.exercises}
          </h3>
          ))}
      <h3>Total of {' '}
        <strong>
          {parts.reduce((sum, part) => sum + part.exercises, 0)} 
          </strong>{' '}
          exercises
          </h3>
    </>
  )
}

export default Course