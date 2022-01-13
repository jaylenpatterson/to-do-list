/*
 * All routes for tasks are defined here
 * Since this file is loaded in server.js into api/tasks,
 *   these routes are mounted onto /tasks
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const searcher = require('../helpers/categorize.js');
const { getUsersTasks, addNewTask, deleteTask, editTask  } = require('./helperFunctions');

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

  // Deleting tasks
	router.post('/delete', (req, res) => {
		const id = req.body.id
		deleteTask(id, db)
		 .then(tasks => res.send(tasks))
      .catch(err => {
        res.send(err);
      });
	})

  // Edit Tasks
  router.post('/:taskID', (req, res) => {
  const userID = '1'
  const category = req.body.category;
  const description = req.body.text_description;
  const taskID = req.params.taskID;

  editTask(userID, category, description, taskID, db)
  .then(task => {
    res.send(task);
  })
  .catch(err => {
    console.log('Error:', err);
  });
});

	return router;

};
