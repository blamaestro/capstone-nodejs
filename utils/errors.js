import { validationResult } from 'express-validator';
import { SQLErrorMessages } from '../constants/errors.js';

const getErrorPayload = message => ({ status: 'Error', message });

export function parseValidationError(req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return false;

  const { param, msg } = errors.array()[0];
  const payload = getErrorPayload(`[${param}] ${msg}`);
  res.status(422).json(payload);
  return true;
}

export function parseSQLError(error) {
  const errorMessage = error.message;

  const matchedMessage = SQLErrorMessages.find(e =>
    errorMessage.includes(e.constraint)
  );

  if (matchedMessage) return matchedMessage;
  return { statusCode: 500, message: errorMessage };
}

export function sendErrorResponse(error, res) {
  const { statusCode, message } = parseSQLError(error);
  res.status(statusCode).json({
    status: 'Error',
    message,
  });
}

export function validateRequest(requestHandler) {
  return function (...args) {
    const isInvalid = parseValidationError(...args);
    if (!isInvalid) requestHandler(...args);
  };
}
