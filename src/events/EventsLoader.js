import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEvents } from './events.actions';
import EventsList from './EventsList';
import EventsMap from '../map/EventsMap';

/**
 * Component for connecting to the events state in Redux
 * (Note that all presentational logic lives in the child components)
 */
class EventsLoader extends React.PureComponent {
  static propTypes = {
    fetchEvents: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const { events, fetchEvents, isLoading } = this.props;
    if ((!events || !events.length) && !isLoading) {
      fetchEvents();
    }
  }

  render() {
    return (
      <div className='app'>
        <header className='app-header' />
        <div className='content-wrapper'>
          <h1 className='content-title'>Events</h1>
          <div className='content-body'>
            <EventsList />
            <EventsMap />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchEvents
};

export default connect(
  null,
  mapDispatchToProps
)(EventsLoader);