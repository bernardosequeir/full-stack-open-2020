const initialState = { message: null, success: null };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ('SET_NOTIFICATION'):
      return action.data;
    default:
      return state;
  }
};

export const setNotification = (message, success) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        success
      }
    });
  };
};

export default reducer;