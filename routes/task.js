/*
 * All routes for tasks are defined here
 * Since this file is loaded in server.js into api/tasks,
 *   these routes are mounted onto /tasks
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const searcher = require('../helpers/categorize.js');
const { getUsersTasks, addNewTask, deleteTask  } = require('./helperFunctions');

module.exports = (db) => {
  // Getting user ID
  router.get('/', (req, res) => {
		const filter = req.query.filter
    const userID = '1';
    if (!userID) {
      res.status(401).send('Not Logged in');
      return;
    }
    getUsersTasks(userID, db, filter)
      .then(tasks => res.send(tasks))
      .catch(err => {
        res.send(err);
      });
  });

  // Adding new task
  router.post('/', (req, res) => {
     const userID = '1';
     const description = req.body.text_description;
     searcher(req.body.text_description)
     .then(res => addNewTask(userID, description, res, db))
     .then(task => res.send(task))
     .catch(err => {
       res.send(err);
     })
    })

	router.post('/delete', (req, res) => {
		const id = req.body.id
		deleteTask(id)
	})

	return router;

};
