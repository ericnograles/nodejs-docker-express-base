require('dotenv/config');
const express = require('express');
const winston = require('winston');
//const { initialize } = require('./passport');

// Server-wide settings
winston.level = process.env.WINSTON_LEVEL || 'debug';
const port = process.env.PORT || 3001;

// Scaffold the server
async function startServer() {
  // const app = initialize(express());
  const app = express();
  app.get('/error', (req, res) => {
    res.status(404).json({message: 'Nope'});
  });

  app.get('/hello', async (req, res) => {
    return res.status(200).json({ message: 'Well hello there' });
  });

  app.listen(port, err => {
    if (err) throw err;
    winston.info(`> Ready on http://localhost:${port}`);
  });
}

// Start the server
startServer();
