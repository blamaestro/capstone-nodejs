import express from 'express';
import { body, query } from 'express-validator';
import userController from '../controllers/userController.js';
import { validationErrorMessages } from '../constants/errors.js';
import { validateRequest } from '../utils/errors.js';

const router = express.Router();

router.get('/', userController.getUsers);

router.get(
  '/:id/logs',
  query('from').optional().isDate().withMessage(validationErrorMessages.date),
  query('to').optional().isDate().withMessage(validationErrorMessages.date),
  query('limit')
    .optional()
    .isNumeric()
    .withMessage(validationErrorMessages.numeric),
  validateRequest(userController.getUserLogs)
);

router.post(
  '/',
  body('username')
    .notEmpty()
    .withMessage(validationErrorMessages.required)
    .isString()
    .withMessage(validationErrorMessages.string),
  validateRequest(userController.createUser)
);

router.post(
  '/:id/exercises',
  body('description')
    .notEmpty()
    .withMessage(validationErrorMessages.required)
    .isString()
    .withMessage(validationErrorMessages.string),
  body('duration')
    .notEmpty()
    .withMessage(validationErrorMessages.required)
    .isNumeric()
    .withMessage(validationErrorMessages.numeric),
  body('date').optional().isDate().withMessage(validationErrorMessages.date),
  validateRequest(userController.createUserExercise)
);

export default router;
