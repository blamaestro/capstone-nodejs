import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(morgan('dev'));

app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/api/users', usersRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
