import express from 'express';
import path from 'path';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';

import connectDB from './index.js';
import userRouter from './routes/userRouter.js';
import rxRouter from './routes/rxRouter.js';

const app = express();
const PORT = 3000;

app.use(json())
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/rx', rxRouter);

// serve static files
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
  })
}

// global err catcher
app.use( (err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error: '+ err.err);
})

// connect to db and add listener
connectDB()
  .then( async () => {
    console.log('Connected to MongoDB.')
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}.`)
    })
  });