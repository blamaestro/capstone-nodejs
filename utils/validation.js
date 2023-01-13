import { validationResult } from 'express-validator';
import { getErrorPayload } from './errors.js';

export function validateRequest(requestHandler) {
  return function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) return requestHandler(req, res);

    const { param, msg } = errors.array()[0];
    const payload = getErrorPayload(`[${param}] ${msg}`);
    res.status(422).json(payload);
  };
}
