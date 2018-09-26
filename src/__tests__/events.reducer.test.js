import { REQUEST_EVENTS, RECEIVE_EVENTS } from '../events/events.actions';
import { eventsReducer } from '../events/events.reducer';

const initialState = {
  events: [],
  isLoading: false
};

const dummyEvents = [
  {
    "id": 1,
    "description": "example",
    "timezone": "America/New_York",
    "title": "Example",
    "summary": "",
    "featured_image_url": "",
    "high_priority": null,
    "sponsor": {},
    "timeslots": [
      {
        "id": 1,
        "start_date": 2,
        "end_date": 3
      },
      {
        "id": 2,
        "start_date": 3,
        "end_date": 4
      }
    ],
    "location": {
      "venue": "",
      "address_lines": [
        "204 E 13th St",
        ""
      ],
      "locality": "",
      "region": "",
      "postal_code": "10003",
      "location": {
        "latitude": 40.7322535,
        "longitude": -73.9874105
      },
      "congressional_district_value": "12",
      "state_leg_district_value": "66",
      "state_senate_district_value": "27",
    },
    "event_type": "CANVASS",
    "created_date": 1,
    "modified_date": 1,
    "browser_url": "https://events.mobilizeamerica.io/event/1/"
  }
];

describe('Errors reducer', () => {
  it('should return the initial state', () => {
    expect(eventsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REQUEST_EVENTS', () => {
    expect(eventsReducer(initialState, {
      type: REQUEST_EVENTS
    })).toEqual({
      events: [],
      isLoading: true
    });
  });

  it('should handle RECEIVE_EVENTS', () => {
    expect(eventsReducer(initialState, {
      type: RECEIVE_EVENTS,
      payload: dummyEvents
    })).toEqual({
      events: dummyEvents,
      isLoading: false
    });
  });
});