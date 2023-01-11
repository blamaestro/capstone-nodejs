import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:id/logs', userController.getUserLogs);

router.post('/', userController.createUser);

router.post('/:id/exercises', userController.createUserExercise);

export default router;
