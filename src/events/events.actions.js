import fetch from 'cross-fetch';
import { handleApiError } from '../error/error.actions';

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

export const requestEvents = () => ({
  type: REQUEST_EVENTS
});

export const receiveEvents = (eventsData) => ({
  type: RECEIVE_EVENTS,
  payload: eventsData
});

export const fetchEvents = () => (dispatch) => {
  dispatch(requestEvents());
  getEvents()
    .then(data => dispatch(receiveEvents(data)))
    .catch(err => dispatch(handleApiError(err)));
}

async function getEvents() {
  const url = '/api/v1/events';
  const response = await fetch(url);
  const json = await response.json();

  return json.data;
}