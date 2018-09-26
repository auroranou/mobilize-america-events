import { combineReducers } from 'redux';
import { eventsReducer } from './events/events.reducer';
import { errorReducer } from './error/error.reducer';

const rootReducer = combineReducers({
  eventsReducer,
  errorReducer
});

export default rootReducer;