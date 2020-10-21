import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const dispatch = useDispatch();

  const vote = (id) => {
    const anecdote = props.anecdotes.find((anecdote) => anecdote.id === id);
    props.addVote(id, anecdote);
    dispatch(setNotification(`you voted on '${anecdote.content}'`, 5));
  };

  // Sorting by highest votes
  const sortedAnecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  if (state.filter === '') return { anecdotes: state.anecdotes };

  return {
    anecdotes: state.anecdotes.filter(
      (anecdote) => anecdote.content.toLowerCase().match(state.filter) !== null
    ),
  };
};

const mapDispatchToProps = {
  addVote,
  setNotification,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;
