import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = props => {
  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);

  const [highest, setHighest] = useState({ index: 0, score: -1 });

  const copy = [...points];

  const nextAnec = () => setSelected(getRandomInt(0, 6));

  const vote = () => {
    copy[selected] += 1;
    setPoints(copy);
    if (points[selected] > highest.score) {
      setHighest({ index: selected, score: points[selected] });
    }
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]} <br />
      has {points[selected]} votes <br />
      <Button handleClick={nextAnec} text="next anecdote" />
      <Button handleClick={vote} text="vote" />
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[highest.index]}
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
