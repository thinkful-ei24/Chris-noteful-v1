'use strict';

// Load array of notes
const express = require('express');

const data = require('./db/notes');

const {port} = require('./config');

const app = express();

// ADD STATIC SERVER HERE

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



app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
// INSERT EXPRESS APP CODE HERE...
