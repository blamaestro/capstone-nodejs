import { errorMessages } from '../constants/errors.js';

export function parseSQLError(error) {
  const errorConstraint = error.toString();

  const errorMessage = errorMessages.find(e =>
    errorConstraint.includes(e.constraint)
  );

  if (errorMessage) return errorMessage;
  return { statusCode: 500, message: 'Error while connecting to database' };
}
