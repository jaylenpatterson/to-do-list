/*
 * All routes for tasks are defined here
 * Since this file is loaded in server.js into api/tasks,
 *   these routes are mounted onto /tasks
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

const { getUsersTasks } = require('./helperFunctions');

module.exports = (db) => {
  router.get('/', (req, res) => {
    const userID = '1';
    if (!userID) {
      res.status(401).send('Not Logged in');
      return;
    }
    getUsersTasks(userID, db)
      .then(tasks => res.send(tasks))
      .catch(err => {
        res.send(err);
      });
  });

  return router;
};
