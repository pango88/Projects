const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.notification, currentId: action.id };
    case 'HIDE_NOTIFICATION':
      if (action.id === state.currentId) return null;
      return state;
    default:
      return state;
  }
};

export const setNotification = (notification, seconds) => {
  const ms = seconds * 1000;
  const id = generateId();
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
      id,
    });
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION', id });
    }, ms);
  };
};

export default notificationReducer;
