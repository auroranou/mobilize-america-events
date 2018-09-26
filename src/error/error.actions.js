export const HANDLE_ERROR = 'HANDLE_ERROR';

export const handleApiError = (errorMessage) => ({
  type: HANDLE_ERROR,
  payload: errorMessage
});