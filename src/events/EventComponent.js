import * as React from 'react';
import PropTypes from 'prop-types';

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

    this.onViewDetailsClick = this.onViewDetailsClick.bind(this);
  }

  render() {
    const { event } = this.props;
    const isVirtualEvent = !event.location || !event.location.address_lines || !event.location.location;
    const eventType = this.getEventTypeText(event.event_type);

    return (
      <div
        className='event-component'
        id={`event-${event.id}`}
      >
        <h3 className='event-component__title'>
          {event.title}
        </h3>
        {this.props.isSelected && <p>SELECTED</p>}
        <span className={`event-component__badge badge--${eventType.toLowerCase()}`}>
          {eventType}
        </span>
        {isVirtualEvent && (
          <span className={`event-component__badge badge--virtual`}>
            Virtual Event
          </span>
        )}
        <p className='event-component__summary'>
          {event.summary}
        </p>
        {!isVirtualEvent && this.getEventAddress(event.location)}
        <button
          onClick={this.onViewDetailsClick}
          type='button'
          value={event.id}
        >
          View details
        </button>
      </div>
    );
  }

  getEventTypeText(eventType) {
    return eventType.replace(/_/g, " ");
  }

  getEventAddress(location) {
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
        </p>
      </div>
    );
  }

  onViewDetailsClick(e) {
    e.preventDefault();
    this.props.onSelected(e.target.value);
  }
}

export default EventComponent;