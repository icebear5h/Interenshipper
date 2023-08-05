const express = require('express');
const internships = require('../routes/internships');
const users = require('../routes/users');
//const returns = require('../routes/returns');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/internships', internships);
  app.use('/api/users', users);
  app.use(error);
}