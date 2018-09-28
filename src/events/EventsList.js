import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectEventOnMap } from './events.actions';
import EventComponent from './EventComponent';
import { eventPropTypes } from './EventProps';
import EmptyState from '../components/EmptyState';

class EventsList extends React.PureComponent {
  static propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.shape(eventPropTypes)
    ).isRequired,
    isLoading: PropTypes.bool,
    selectedListEventId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  componentDidUpdate(prevProps) {
    if ((prevProps.selectedListEventId !== this.props.selectedListEventId) && (this.props.selectedListEventId !== null)) {
      // Get the correct EventComponent node
      const eventComponentNode = document.getElementById(`event-${this.props.selectedListEventId}`);

      if (eventComponentNode) {
        // And scroll it to the top
        window.scrollTo(0, eventComponentNode.offsetTop - 48);
      }
    }
  }

  render() {
    // TO DO: Properly handle loading state
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
            isSelected={this.props.selectedListEventId.toString() === e.id.toString()}
            key={e.id}
            onMapLinkClick={this.props.selectEventOnMap}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => (state.eventsReducer);

const mapDispatchToProps = {
  selectEventOnMap
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsList);