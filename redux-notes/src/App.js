import React, { useEffect } from 'react';
import NewNote from './components/NowNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import noteService from './services/notes';
import { initializeNotes } from './reducers/noteReducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes(notes));
  }, [dispatch]);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
