'use strict';

// Load array of notes
const express = require('express');

const data = require('./db/notes');

const app = express();

// ADD STATIC SERVER HERE

app.get('/api/notes', (req, res) => {
  res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
  const foundItem = data.find(item => item.id === Number(req.params.id));
  return res.json(foundItem);
});



app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
// INSERT EXPRESS APP CODE HERE...
