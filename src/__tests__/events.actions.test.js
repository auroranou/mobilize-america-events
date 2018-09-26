import { requestEvents, receiveEvents, REQUEST_EVENTS, RECEIVE_EVENTS } from '../events/events.actions';

describe('Redux actions for events', () => {
  it('should create an action to request events', () => {
    const expected = {
      type: REQUEST_EVENTS
    };

    expect(requestEvents()).toEqual(expected);
  });

  it('should create an action when events are received from the API', () => {
    const expected = {
      type: RECEIVE_EVENTS,
      payload: []
    };

    expect(receiveEvents([])).toEqual(expected);
  });
});