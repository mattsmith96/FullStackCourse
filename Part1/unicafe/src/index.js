import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <tbody>
      <tr>
        <td> {props.text} </td>
        <td> {props.value} </td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <Statistic text={"Good"} value={props.good}/>
      <Statistic text={"Neutral"} value={props.neutral}/>
      <Statistic text={"Bad"} value={props.bad}/>
      <Statistic text="All" value={props.total}/>
      <Statistic text="Average" value={props.average}/>
      <Statistic text="Positive" value={props.percent}/>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const percentPositive = good * 100 / total
  const percentStr = '' + percentPositive + ' %'
  const avgScore = (good - bad) / total

  const handleGoodClick = () =>setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h2>Feedback</h2>
      <Button handleClick={handleGoodClick} text='Good'/>
      <Button handleClick={handleNeutralClick} text='Neutral'/>
      <Button handleClick={handleBadClick} text='Bad'/>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={avgScore} percent={percentStr}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)