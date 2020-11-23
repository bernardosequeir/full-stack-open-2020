import blogService from '../services/blogs';
import loginService from '../services/login';
const reducer = (state = null, action) => {
  switch (action.type) {
    case ('INIT_USER'):
      return action.data;
    case ('LOGIN_USER'):
      return action.data;
    case ('LOGOUT_USER'):
      return null;
    default:
      return state;
  }
};

export const initializeLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({
        type: 'INIT_USER',
        data: user
      });
      blogService.setToken(user.token);
    }
  };
};

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({
        type: 'LOGIN_USER',
        data: user
      });
    } catch (exception) {
      /*   setSuccess(false);
        setMessage('wrong username or password');
        setTimeout(() => {
          setMessage(null);
        }, 5000); */
    }
  };
};
export const logoutUser = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT_USER',
      data: null
    });
  };
};
export default reducer;