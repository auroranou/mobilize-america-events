import React from 'react';
import PropTypes from 'prop-types';

const EmptyState = (props) => (
  <div className='empty-state-wrapper'>
    {props.message}
  </div>
);

EmptyState.propTypes = {
  message: PropTypes.string.isRequired
};

export default EmptyState;