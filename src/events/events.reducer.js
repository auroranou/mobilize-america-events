import { REQUEST_EVENTS, RECEIVE_EVENTS, SELECT_EVENT } from './events.actions';

export const eventsReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_EVENTS:
      return {
        ...state,
        isLoading: true,
        selectedEventId: null
      };

    case RECEIVE_EVENTS:
      const events = action.payload;
      return {
        ...state,
        isLoading: false,
        events,
        selectedEventId: events.length ? events[0].id : null
      };

    case SELECT_EVENT:
      return {
        ...state,
        selectedEventId: action.payload
      };

    default:
      return {
        isLoading: false,
        events: [],
        selectedEventId: null
      };
  }
}