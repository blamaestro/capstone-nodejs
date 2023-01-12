export const SQLErrorMessages = [
  {
    statusCode: 409,
    constraint: 'SQLITE_CONSTRAINT: UNIQUE',
    message: 'User with this username already exists',
  },
];

export const validationErrorMessages = {
  required: 'is required',
  string: 'must be a string',
  numeric: 'must be numeric',
  date: 'must be a valid date',
};
