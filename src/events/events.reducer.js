import { REQUEST_EVENTS, RECEIVE_EVENTS } from './events.actions';

export const eventsReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_EVENTS:
      return {
        ...state,
        isLoading: true,
      };

    case RECEIVE_EVENTS:
      return {
        ...state,
        isLoading: false,
        events: action.payload
      };

    default:
      return {
        isLoading: false,
        events: []
      };
  }
}