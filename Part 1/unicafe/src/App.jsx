import { useState } from 'react'

  const Button = (props) => {
    return (
      <button onClick = {props.handleClick}>{props.text}</button>
    )
  }

  const Statistics = (props) =>{
    if (props.countGood === 0 && props.countNeutral === 0 && props.countBad === 0) {
        return (
          <p>No feedback given</p>
        )
      }
      return (
        <>
          <p>good {props.countGood}</p>
          <p>neutral {props.countNeutral}</p>
          <p>bad {props.countBad}</p>
          <p>all {props.countGood + props.countNeutral + props.countBad}</p>
          <p>average {(props.countGood - props.countBad) / (props.countGood + props.countNeutral + props.countBad)}</p>
          <p>positive {props.countGood / (props.countGood + props.countNeutral + props.countBad) * 100} %</p>
        </>
      )

  }
function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [countGood, setCountGood] = useState(0);
  const [countNeutral, setCountNeutral] = useState(0);
  const [countBad, setCountBad] = useState(0);



  return (
    <>
      <h1>give feedback</h1>

      <Button handleClick = {() => {
          setGood(good + 1)
          setCountGood(countGood + 1)
        console.log(good)}} text = "good" />

      <Button handleClick = {() => {
          setNeutral(neutral + 1)
          setCountNeutral(countNeutral + 1)
        console.log(neutral)}} text = "neutral" />

      <Button handleClick = {() => {
          setBad(bad + 1)
          setCountBad(countBad + 1)
        console.log(bad)}} text = "bad" />

      <h1>statistics</h1>
      <Statistics countGood={countGood} countNeutral={countNeutral} countBad={countBad} />
    </>
  )
}

export default App
