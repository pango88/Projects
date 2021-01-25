const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const alertReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ALERT':
      return { message: action.alert, currentId: action.id };
    case 'HIDE_ALERT':
      if (action.id === state.currentId) return null;
      return state;
    default:
      return state;
  }
};

export const setAlert = (alert, seconds) => {
  const ms = seconds * 1000;
  const id = generateId();
  return async (dispatch) => {
    dispatch({
      type: 'SET_ALERT',
      alert,
      id,
    });
    setTimeout(() => {
      dispatch({ type: 'HIDE_ALERT', id });
    }, ms);
  };
};

export default alertReducer;
