// API Server for NotesApp

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import apiRouter from './routes';
import db from './db'; // Connect db

const app = express();

app.set('port', (process.env.PORT || 3001));

// Only serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.user(express.static('client/build'));
}

// Parse body params as json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup some logging
app.use(morgan('dev'));

// Define our routes for the Notes API
app.use('/api', apiRouter);

// Some basic error handling
app.use((err, req, res) => {
  res.status(500);
  res.render('error', { error: err });
});

// Start up DB
db.connect();

// Start up HTTP server
app.listen(app.get('port'), () => {
  console.log(`Listening on: http://localhost:${app.get('port')}/`);
});
