import React from 'react';
import PropTypes from 'prop-types';
const Notification = ({ message, success }) => {
  if (message === null) {
    return null;
  }

  return <div className={success ? 'success' : 'error'}>{message}</div>;
};

Notification.propTypes = {
  message : PropTypes.string,
  success: PropTypes.bool.isRequired
};
export default Notification;
