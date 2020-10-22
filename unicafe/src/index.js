import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {
    return <div>No Feedback given</div>;
  }
  return (
    <div>
      <table>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={total} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </table>
    </div>
  );
};

const Statistic = props => (
  <tr>
    <td>{props.text}</td> <td>{props.value}</td>
  </tr>
);

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodvote = () => setGood(good + 1);
  const neutralvote = () => setNeutral(neutral + 1);
  const badvote = () => setBad(bad + 1);

  const total = good + neutral + bad;
  const average = (good + bad * -1) / total;
  const positive = (good / total) * 100 + '%';

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodvote} text="good" />
      <Button handleClick={neutralvote} text="neutral" />
      <Button handleClick={badvote} text="bad" />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
