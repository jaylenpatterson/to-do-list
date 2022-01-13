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


	router.post('/', (req, res) => {
    const userID = '1';
		const values = [ req.body.task, req.body.start_date, userID, req.body.priority ];

		const addNewTask = function(values, db) {
			const text = `INSERT INTO tasks (title, start_date, user_id, urgency, category)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `;

			return db.query(text, values).catch((err) => {
				console.log(err.message);
			});
		};

		searcher(req.body.task)
			.then((result) => {
				values.push(result)
				return addNewTask(values, db);
			})
			.catch(console.error);

		if (!req.body) {
			res.status(400).json({ error: 'invalid request: no data in POST body' });
			return;
		}
	});

	router.post('/delete', (req, res) => {
		const id = req.body.id
		deleteTask(id)
	})

	return router;

};
