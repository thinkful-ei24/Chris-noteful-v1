'use strict';

function logger(req, res, next){
  const now = new Date();
  console.log(`${now.toLocalDateString()}, ${req.method}, ${req.url}`);
  next();
}

module.exports = logger;