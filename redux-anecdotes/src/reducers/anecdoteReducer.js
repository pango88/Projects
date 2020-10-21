import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    // might need some cleaning?
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    case 'INIT_ANECDOTES':
      return action.data;
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    default:
      return state;
  }
};

// This function gets invoked in anecdoteList.js when a button is clicked, when this function is called and runs through its code it then goes to the reducer with the case 'VOTE' which i guess is responsible for updating the state
export const addVote = (id, anecdote) => {
  const obj = { ...anecdote, votes: anecdote.votes + 1 };
  return async (dispatch) => {
    await anecdoteService.addVote(id, obj);
    dispatch({ type: 'VOTE', data: { id } });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default reducer;
