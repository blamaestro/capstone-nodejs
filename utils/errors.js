import { errorMessages } from '../constants/errors.js';

export function parseSQLError(error) {
  const errorConstraint = error.toString();

  const errorMessage = errorMessages.find(e =>
    errorConstraint.includes(e.constraint)
  );

  if (errorMessage) return errorMessage;
  return { statusCode: 500, message: 'Error while connecting to database' };
}

export function sendErrorResponse(error, res) {
  const { statusCode, message } = parseSQLError(error);
  res.status(statusCode).json({
    status: 'Error',
    message,
  });
}
