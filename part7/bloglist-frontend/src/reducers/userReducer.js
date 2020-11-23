import userService from '../services/users';

const reducer = (state = null, action) => {
  switch (action.type) {
    case ('INIT_USERS'):
      return action.data;
    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async dispatch => {
    const userList = await userService.getAll();
    dispatch({
      type: 'INIT_USERS',
      data: userList
    });
  };
};

export default reducer;