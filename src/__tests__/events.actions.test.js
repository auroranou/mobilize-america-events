import * as events from '../events/events.actions';

describe('Redux actions for events', () => {
  it('should create an action to request events', () => {
    const expected = {
      type: events.REQUEST_EVENTS
    };

    expect(events.requestEvents()).toEqual(expected);
  });

  it('should create an action when events are received from the API', () => {
    const expected = {
      type: events.RECEIVE_EVENTS,
      payload: []
    };

    expect(events.receiveEvents([])).toEqual(expected);
  });

  it('should create an action when a user selects an event in the list', () => {
    const expected = {
      type: events.SELECT_EVENT_ON_LIST,
      payload: 100
    };

    expect(events.selectEventOnList(100)).toEqual(expected);
  });

  it('should create an action when a user selects an event on the map', () => {
    const expected = {
      type: events.SELECT_EVENT_ON_MAP,
      payload: 100
    };

    expect(events.selectEventOnMap(100)).toEqual(expected);
  });
});