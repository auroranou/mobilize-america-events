import { handleApiError, HANDLE_ERROR } from '../error/error.actions';

describe('Redux actions for API error handling', () => {
  it('should create an action when an API error is passed down', () => {
    const expected = {
      type: HANDLE_ERROR,
      payload: 'Uh oh'
    };

    expect(handleApiError('Uh oh')).toEqual(expected);
  });
});