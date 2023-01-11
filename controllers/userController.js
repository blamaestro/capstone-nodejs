import Users from '../models/users.js';
import { getTodayISO, parseSQLError } from '../utils/index.js';

const controller = {};

controller.getUsers = async (req, res) => {
  const users = await Users.all('SELECT id, username FROM Users');
  res.json(users);
};

controller.getUserLogs = async (req, res) => {
  const userId = +req.params.id;
  const { from, to, limit } = req.query;

  const user = await Users.get(
    'SELECT username FROM Users WHERE id = ?',
    userId
  );
  let exercises = await Users.all(
    'SELECT id, description, duration, date FROM Exercises WHERE userId = ?',
    userId
  );
  const exerciseCount = exercises.length;

  if (from) exercises = exercises.filter(e => e.date >= from);
  if (to) exercises = exercises.filter(e => e.date < to);
  if (limit) exercises = exercises.slice(0, limit);

  const response = {
    id: userId,
    username: user.username,
    count: exerciseCount,
    log: exercises,
  };
  res.json(response);
};

controller.createUser = async (req, res) => {
  const { username } = req.body;
  try {
    await Users.run('INSERT INTO Users (username) VALUES (?)', username);
  } catch (err) {
    const { statusCode, message } = parseSQLError(err);
    res.status(statusCode).json({
      status: 'Error',
      message,
    });
  }
  res.status(201).json();
};

controller.createUserExercise = async (req, res) => {
  const userId = +req.params.id;
  const { description, duration } = req.body;
  const date = req.body.date || getTodayISO();

  const exercise = await Users.run(
    'INSERT INTO Exercises (userId,description,duration,date) VALUES (?,?,?,?)',
    userId,
    description,
    duration,
    date
  );

  const response = {
    exerciseId: exercise.lastID,
    userId,
    description,
    duration,
    date,
  };
  res.status(201).json(response);
};

export default controller;
