import userService from '../services/users';

const membersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_MEMBERS':
      return action.data;
    default:
      return state;
  }
};

export const initMembers = () => {
  return async (dispatch) => {
    const members = await userService.getAllUsers();
    dispatch({
      type: 'INIT_MEMBERS',
      data: members,
    });
  };
};

export default membersReducer;
