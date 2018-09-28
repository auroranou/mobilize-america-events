import React from 'react';
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectEventOnList } from '../events/events.actions';
import { eventPropTypes } from '../events/EventComponent';
import MapMarker from './MapMarker';
import 'mapbox-gl/dist/mapbox-gl.css';

class EventsMap extends React.PureComponent {
  static propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.shape(eventPropTypes)
    ),
    selectedEventId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  constructor(props) {
    super(props);

    this.state = {
      popup: null,
      viewport: {
        width: 400,
        height: 500,
        latitude: 39.8283,
        longitude: -98.5795,
        zoom: 3
      }
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onPopupCloseClick = this.onPopupCloseClick.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.selectedEventId !== this.props.selectedEventId) && (this.props.selectedEventId !== null)) {
      const event = this.props.events.find(e => e.id === this.props.selectedEventId);

      if (!event) return;

      const newCoordinates = event.location.location;
      const newViewport = {
        ...this.state.viewport,
        latitude: newCoordinates.latitude,
        longitude: newCoordinates.longitude
      };

      this.setState({
        ...this.state,
        popup: event,
        viewport: newViewport
      });
    }
  }

  render() {
    return (
      <div className='events-map-wrapper'>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={this.updateViewport}
        >
          {this.renderMarkers()}
          {this.renderPopup()}
          <NavigationControl
            onViewportChange={this.updateViewport}
          />
        </ReactMapGL>
      </div>
    );
  }

  renderMarkers() {
    const { events } = this.props;

    return events.map(e => (
      <Marker
        key={e.id}
        latitude={e.location.location.latitude}
        longitude={e.location.location.longitude}
      >
        <MapMarker onClick={this.onMarkerClick.bind(this, e.id)} />
      </Marker>
    ));
  }

  renderPopup() {
    return this.state.popup && (
      <Popup
        key={this.state.popup.id}
        latitude={this.state.popup.location.location.latitude}
        longitude={this.state.popup.location.location.longitude}
        onClose={this.onPopupCloseClick}
      >
        {this.state.popup.title}
      </Popup>
    )
  }

  onMarkerClick(eventId, e) {
    e.preventDefault();
    this.props.selectEventOnList(eventId);

    const selectedEvent = this.props.events.find(ev => ev.id.toString() === eventId.toString());
    this.setState({
      ...this.state,
      popup: selectedEvent
    });
  }

  onPopupCloseClick() {
    this.setState({
      ...this.state,
      popup: null
    });
  }

  updateViewport(viewport) {
    this.setState({ viewport });
  }
}

const mapStateToProps = (state) => {
  const { eventsReducer } = state;
  const eventsWithLocations = eventsReducer.events.filter(e => e.location && e.location.location && e.location.location.latitude && e.location.location.longitude);

  return {
    events: eventsWithLocations,
    selectedEventId: state.eventsReducer.selectedMapEventId
  }
}

const mapDispatchToProps = {
  selectEventOnList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsMap);