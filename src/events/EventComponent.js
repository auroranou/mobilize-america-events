import * as React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';

const LONG_DATE_FORMAT = 'dddd, MMMM Do YYYY, h:mm a';

const eventLocationProps = {
  address_lines: PropTypes.arrayOf(PropTypes.string),
  congressional_district: PropTypes.string,
  locality: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }),
  postal_code: PropTypes.string,
  region: PropTypes.string,
  state_leg_district: PropTypes.string,
  state_senate_district: PropTypes.string,
  venue: PropTypes.string
};

const eventSponsorProps = {
  candidate_name: PropTypes.string,
  created_date: PropTypes.number,
  district: PropTypes.string,
  event_feed_url: PropTypes.string,
  id: PropTypes.number.isRequired,
  is_coordinated: PropTypes.bool,
  is_independent: PropTypes.bool,
  is_primary_campaign: PropTypes.bool,
  modified_date: PropTypes.number,
  name: PropTypes.string.isRequired,
  race_type: PropTypes.string,
  slug: PropTypes.string,
  state: PropTypes.string
};

export const eventPropTypes = {
  browser_url: PropTypes.string.isRequired,
  created_date: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  event_type: PropTypes.oneOf([
    'CANVASS',
    'PHONE_BANK',
    'TEXT_BANK',
    'MEETING',
    'COMMUNITY',
    'FUNDRAISER',
    'MEET_GREET',
    'HOUSE_PARTY',
    'VOTER_REG',
    'TRAINING',
    'FRIEND_TO_FRIEND_OUTREACH',
    'OTHER'
  ]).isRequired,
  featured_image_url: PropTypes.string.isRequired,
  high_priority: PropTypes.bool,
  id: PropTypes.number.isRequired,
  location: PropTypes.shape(eventLocationProps),
  modified_date: PropTypes.number,
  summary: PropTypes.string.isRequired,
  sponsor: PropTypes.shape(eventSponsorProps),
  timeslots: PropTypes.arrayOf(
    PropTypes.shape({
      end_date: PropTypes.number,
      id: PropTypes.number.isRequired,
      start_date: PropTypes.number
    })
  ).isRequired,
  timezone: PropTypes.string,
  title: PropTypes.string.isRequired
};

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
          <button
            className='event-component__button'
            onClick={this.onViewOnMapClick.bind(this, eventId)}
            type='button'
          >
            &nbsp; (View on map)
          </button>
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