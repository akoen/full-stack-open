import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = (props) => {
  const [good, neutral, bad] = props.data;

  const total = good + bad + neutral;
  const average = 0 + (good - bad) / total;
  const positive = good / total;

  if (props.data.some((i) => i !== 0)) {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="total" value={total} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={positive + ' %'} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => {
    setGood(good + 1);
  };

  const increaseBad = () => {
    setBad(bad + 1);
  };

  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />
      <Statistics data={[good, neutral, bad]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
