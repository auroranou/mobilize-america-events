import { HANDLE_ERROR } from './error.actions';

export const errorReducer = (state, action) => {
  switch (action.type) {
    case HANDLE_ERROR:
      return {
        ...state,
        message: action.payload
      };

    default:
      return {
        message: null
      };
  }
}