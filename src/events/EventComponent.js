import * as React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { eventPropTypes } from './EventProps';

const LONG_DATE_FORMAT = 'dddd, MMMM Do YYYY, h:mm a';

class EventComponent extends React.PureComponent {
  static propTypes = {
    event: PropTypes.shape(eventPropTypes).isRequired,
    isSelected: PropTypes.bool,
    onSelected: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      showDetails: false
    }

    this.onViewDetailsClick = this.onViewDetailsClick.bind(this);
  }

  render() {
    const { event, isSelected } = this.props;
    const isVirtualEvent = !event.location || !event.location.address_lines || !event.location.location;

    let classNames = 'event-component';
    if (this.state.showDetails) {
      classNames += ' event-component--active';
    }

    if (isSelected) {
      classNames += ' event-component--selected';
    }

    return (
      <div
        className={classNames}
        id={`event-${event.id}`}
      >
        {this.renderEventTitle(event.title, event.event_type, isVirtualEvent)}
        {this.renderEventDate(event.timeslots)}
        <p className='event-component__summary'>
          {event.summary}
        </p>
        {!isVirtualEvent && this.renderEventAddress(event.id, event.location)}
        <button
          className='event-component__button'
          onClick={this.onViewDetailsClick}
          type='button'
        >
          {this.state.showDetails ? 'Hide details' : 'View details'}
        </button>
        {this.renderDetailsDrawer(event)}
      </div>
    );
  }

  getEventTypeText(eventType) {
    return eventType.replace(/_/g, ' ');
  }

  getEventTypeClassName(eventType) {
    return eventType.replace(/_/g, '-').toLowerCase();
  }

  renderEventTitle(title, eventType, isVirtualEvent) {
    return (
      <div className='event-component__title-wrapper'>
        <h2 className='event-component__title'>
          {title}
        </h2>
        <span className={`event-component__badge badge--${this.getEventTypeClassName(eventType)}`}>
          {this.getEventTypeText(eventType)}
        </span>
        {isVirtualEvent && (
          <span className={`event-component__badge badge--virtual`}>
            Virtual Event
      </span>
        )}
      </div>
    );
  }

  renderEventDate(timeslots) {
    if (timeslots.length > 1) {
      return (<span className='bold'>Multiple times</span>)
    }

    return (
      <span className='bold'>
        {moment(timeslots[0].start_date).format(LONG_DATE_FORMAT)}
      </span>
    );
  }

  renderEventAddress(eventId, location) {
    const latitude = location.location ? location.location.latitude : null;
    const longitude = location.location ? location.location.longitude : null;
    return (
      <div className='event-component__address'>
        {location.venue && (
          <p>
            {location.venue}
          </p>
        )}
        {location.address_lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
        <p>
          {location.locality && location.locality}
          {location.locality && location.region && ', '}
          {location.region && location.region}
          {location.region && location.zip_code && ' '}
          {location.zip_code && location.zip_code}
          {latitude && longitude && (
            <button
              className='event-component__button'
              onClick={this.onViewOnMapClick.bind(this, eventId)}
              type='button'
            >
              &nbsp; (View on map)
            </button>
          )}
        </p>
      </div>
    );
  }

  renderDetailsDrawer(event) {
    return (
      <div className='event-component__details-drawer'>
        <img
          className='event-component__image'
          src={event.featured_image_url}
        />
        <div className='event-component__details-drawer__section'>
          <h3 className='event-component__subtitle'>Description</h3>
          <p className='event-component__text'>
            {event.description}
          </p>
        </div>
        <div className='event-component__details-drawer__section'>
          <h3 className='event-component__subtitle'>Sponsor</h3>
          <a
            className='event-component__text'
            href={event.sponsor.event_feed_url}
          >
            {event.sponsor.name}
          </a>
        </div>
        <div className='event-component__details-drawer__section'>
          <h3 className='event-component__subtitle'>Timeslots</h3>
          {event.timeslots.map(t => (
            <div
              className='event-component__timeslot'
              key={t.id}
            >
              <span className='bold'>Start: </span>
              <span>
                {moment(t.start_date).format('dddd, MMMM Do YYYY, h:mm a')}
              </span>
              <br />
              <span className='bold'>End: </span>
              <span>
                {moment(t.end_date).format('dddd, MMMM Do YYYY, h:mm a')}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  onViewOnMapClick(eventId, e) {
    e.preventDefault();
    this.props.onSelected(eventId);
  }

  onViewDetailsClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails
    }));
  }
}

export default EventComponent;