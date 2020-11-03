const reducer = (state = null, action) => {
  switch (action.type) {
    case ('CREATE_NOTIFICATION'):
      return action.notification
    case ('REMOVE_NOTIFICATION'):
      return null
    default:
      return state
  }

}


export const createNotification = (notification) => {
  return {
    type: 'CREATE_NOTIFICATION',
    notification
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(createNotification(notification))
    setTimeout(() => dispatch(removeNotification()), time)
  }
}

export default reducer