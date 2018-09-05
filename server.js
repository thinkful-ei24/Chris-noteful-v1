'use strict';

// Load array of notes
const express = require('express');

const data = require('./db/notes');

const {PORT} = require('./config');

const logger = require('./middleware/logger');

const app = express();

// ADD STATIC SERVER HERE
app.use(logger);

app.use(express.json());

app.get('/api/notes', (req, res) => {
  const query = req.query;
  let list = data;
  console.log(query);
  if (query.searchTerm){
    list = list.filter(item => item.title.includes(query.searchTerm) || item.content.includes(query.searchTerm));
    return res.json(list);
  }
  return res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
  const foundItem = data.find(item => item.id === Number(req.params.id));
  return res.json(foundItem);
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
// INSERT EXPRESS APP CODE HERE...
