import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEvents } from './events.actions';

class EventsLoader extends React.PureComponent {
  static propTypes = {
    events: PropTypes.array.isRequired,
    fetchEvents: PropTypes.func,
    isLoading: PropTypes.bool.isRequired
  };

  componentWillMount() {
    const { events, fetchEvents, isLoading } = this.props;
    if ((!events || !events.length) && !isLoading) {
      fetchEvents();
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.eventsReducer;
}

const mapDispatchToProps = {
  fetchEvents
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsLoader);