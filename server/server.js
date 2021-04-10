const dotenv = require('dotenv').config();
const cors = require('cors');
const express = require('express');
const todoRouter = require('./todoRouter.js');

// Initiate app 
const app = express();

// use CORS
app.use(cors());

// Handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handler for all requests at /api
app.use('/api', todoRouter);

// Catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send(`404 - Could not find that what you seek`));

// Express global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});