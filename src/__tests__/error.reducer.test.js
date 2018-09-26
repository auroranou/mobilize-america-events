import { HANDLE_ERROR } from '../error/error.actions';
import { errorReducer } from '../error/error.reducer';

const initialState = {
  message: null
};

describe('Errors reducer', () => {
  it('should return the initial state', () => {
    expect(errorReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle HANDLE_ERROR', () => {
    expect(errorReducer(initialState, {
      type: HANDLE_ERROR,
      payload: 'Uh oh'
    })).toEqual({
      message: 'Uh oh'
    });
  });
});