import React from 'react';
import PropTypes from 'prop-types';

const Alert = (props) => (
  <div className='alert alert--error'>
    <span>{props.message}</span>
    <span>{props.children}</span>
  </div>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired
};

export default Alert;