import React from 'react';
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectEvent } from '../events/events.actions';
import { eventPropTypes } from '../events/EventComponent';
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
        height: 400,
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 8
      }
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onPopupCloseClick = this.onPopupCloseClick.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.events !== this.props.events && this.props.events.length > 0) {
      const newCoordinates = this.props.events[0].location.location;
      const newViewport = {
        ...this.state.viewport,
        latitude: newCoordinates.latitude,
        longitude: newCoordinates.longitude
      };

      this.updateViewport(newViewport);
    }
  }

  render() {
    return (
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
        <button
          onClick={this.onMarkerClick}
          type='button'
          value={e.id}
        >
          *
        </button>
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

  onMarkerClick(e) {
    e.preventDefault();
    this.props.selectEvent(e.target.value);

    const selectedEvent = this.props.events.find(ev => ev.id.toString() === e.target.value.toString());
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
    selectedEventId: state.eventsReducer.selectedEventId
  }
}

const mapDispatchToProps = {
  selectEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsMap);