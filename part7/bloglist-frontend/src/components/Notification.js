import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
const Notification = () => {
  const { message, success } = useSelector(state => state.notification);
  if (message === null) {
    return null;
  }

  return <div className={success ? 'success' : 'error'}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
  success: PropTypes.bool.isRequired
};
export default Notification;
