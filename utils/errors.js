import { SQLErrorMessages } from '../constants/errors.js';

export const getErrorPayload = message => ({ status: 'Error', message });

export function parseSQLError(errorMessage) {
  return SQLErrorMessages.find(e => errorMessage.includes(e.constraint));
}

export function parseError(error) {
  const errorMessage = error.message;
  const error500 = { statusCode: 500, message: errorMessage };

  if (errorMessage.includes('SQLITE')) {
    return parseSQLError(errorMessage) || error500;
  }

  return error500;
}

export function sendError(error, res) {
  const { statusCode, message } = parseError(error);
  const payload = getErrorPayload(message);
  res.status(statusCode).json(payload);
}
