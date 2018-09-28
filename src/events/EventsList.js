import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectEventOnMap } from './events.actions';
import EventComponent, { eventPropTypes } from './EventComponent';
import EmptyState from '../components/EmptyState';

class EventsList extends React.PureComponent {
  static propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.shape(eventPropTypes)
    ).isRequired,
    isLoading: PropTypes.bool,
    selectedEventId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  componentDidUpdate(prevProps) {
    if ((prevProps.selectedEventId !== this.props.selectedEventId) && (this.props.selectedEventId !== null)) {
      // Get the correct EventComponent node
      const eventComponentNode = document.getElementById(`event-${this.props.selectedEventId}`);

      if (eventComponentNode) {
        // And scroll it to the top
        window.scrollTo(0, eventComponentNode.offsetTop - 48);
      }
    }
  }

  render() {
    if (this.props.isLoading || !this.props.events.length) {
      return (<EmptyState message='Sorry, no events were found.' />);
    }

    return (
      <div
        className='events-list'
        id='events-list'
      >
        {this.props.events.map(e =>
          <EventComponent
            event={e}
            isSelected={this.props.selectedEventId.toString() === e.id.toString()}
            key={e.id}
            onSelected={this.props.selectEventOnMap}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.eventsReducer.events,
  isLoading: false,
  selectedEventId: state.eventsReducer.selectedListEventId
});

const mapDispatchToProps = {
  selectEventOnMap
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsList);