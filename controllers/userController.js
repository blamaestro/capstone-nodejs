import Users from '../models/users.js';

const controller = {};

controller.getUsers = async (req, res) => {
  const users = await Users.all('SELECT id, username FROM Users');
  res.json(users);
};

controller.getUserLogs = async (req, res) => {};

controller.createUser = async (req, res) => {
  const { username } = req.body;
  await Users.run('INSERT INTO Users (username) VALUES (?)', username);
  res.status(201).json();
};

controller.createUserExercise = async (req, res) => {
  // const { id, username } = req.body;
  // await Users.run('INSERT INTO Users (id,username) VALUES (?,?)', id, username);
  // res.status(201).end();
};

export default controller;
