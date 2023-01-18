import Users from '../models/users/users.js';
import {
  getTodayISO,
  getDateQuery,
  getLimitQuery,
  sendError,
} from '../utils/index.js';

const controller = {};

controller.getUsers = async (req, res) => {
  try {
    const users = await Users.all(
      'SELECT id, username FROM Users ORDER BY id ASC'
    );
    res.json(users);
  } catch (err) {
    sendError(err.message, res);
  }
};

controller.getUserLogs = async (req, res) => {
  const userId = +req.params.id;
  const { from, to, limit } = req.query;

  try {
    const user = await Users.get(
      'SELECT username FROM Users WHERE id = ?',
      userId
    );
    if (!user?.username) {
      sendError('Unable to get logs of non-existing user', res, 404);
      return;
    }

    const totalCount = await Users.get(
      'SELECT COUNT(*) count FROM Exercises WHERE userId = ?',
      userId
    );
    const exercises = await Users.all(
      `SELECT id, description, duration, date, userId FROM Exercises
      WHERE userId = ? ${getDateQuery(from, to)}
      ORDER BY date ASC ${getLimitQuery(limit)}`,
      userId
    );

    const payload = {
      id: userId,
      username: user.username,
      count: totalCount.count,
      log: exercises,
    };
    res.json(payload);
  } catch (err) {
    sendError(err.message, res);
  }
};

controller.createUser = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await Users.run(
      'INSERT INTO Users (username) VALUES (?)',
      username
    );
    const payload = { id: user.lastID, username };
    res.status(201).json(payload);
  } catch (err) {
    sendError(err.message, res);
  }
};

controller.createUserExercise = async (req, res) => {
  const userId = +req.params.id;
  const { description } = req.body;
  const duration = +req.body.duration;
  const date = req.body.date || getTodayISO();

  try {
    const user = await Users.get('SELECT * FROM Users WHERE id = ?', userId);
    if (!user?.username) {
      throw new Error('Unable to create exercise for non-existing user');
    }

    const exercise = await Users.run(
      'INSERT INTO Exercises (userId,description,duration,date) VALUES (?,?,?,?)',
      userId,
      description,
      duration,
      date
    );

    const payload = {
      exerciseId: exercise.lastID,
      userId,
      description,
      duration,
      date,
    };
    res.status(201).json(payload);
  } catch (err) {
    sendError(err.message, res);
  }
};

export default controller;
