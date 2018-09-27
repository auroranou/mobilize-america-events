import React from 'react';
import PropTypes from 'prop-types';
import EventComponent, { eventPropTypes } from './EventComponent';
import EmptyState from '../components/EmptyState';

class EventsList extends React.PureComponent {
  static propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.shape(eventPropTypes)
    )
  };

  render() {
    if (!this.props.events.length) {
      return (<EmptyState message='Sorry, no events were found.' />);
    }

    return (
      <div id='events-list'>
        {this.props.events.map(e =>
          <EventComponent key={e.id} event={e} />
        )}
      </div>
    );
  }
}

export default EventsList;