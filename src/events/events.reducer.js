import { REQUEST_EVENTS, RECEIVE_EVENTS, SELECT_EVENT_ON_LIST, SELECT_EVENT_ON_MAP } from './events.actions';

export const eventsReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_EVENTS:
      return {
        ...state,
        isLoading: true,
        selectedListEventId: null,
        selectedMapEventId: null
      };

    case RECEIVE_EVENTS:
      const events = action.payload;
      return {
        ...state,
        isLoading: false,
        events,
        selectedListEventId: events.length ? events[0].id : null,
        selectedMapEventId: null
      };

    case SELECT_EVENT_ON_LIST:
      return {
        ...state,
        selectedListEventId: action.payload
      };

    case SELECT_EVENT_ON_MAP:
      return {
        ...state,
        selectedListEventId: action.payload,
        selectedMapEventId: action.payload
      };

    default:
      return {
        isLoading: false,
        events: [],
        selectedListEventId: null,
        selectedMapEventId: null
      };
  }
}