const express = require('express');
const router = express.Router();
const searcher = require('../helpers/categorize.js');

module.exports = (db) => {
	router.get('/', (req, res) => {});

	router.post('/', (req, res) => {
		const values = [ req.body.task, req.body.start_date, req.body.priority ];

		const addNewTask = function(values, db) {
			const text = `INSERT INTO tasks (title, start_date, urgency, category)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;

			return db.query(text, values).catch((err) => {
				console.log(err.message);
			});
		};

		searcher(req.body.task)
			.then((result) => {
				if (result === 'read') {
					category = 1;
					values.push(category);
				}
				if (result === 'watch') {
					category = 2;
					values.push(category);
				}
				if (result === 'eat') {
					category = 3;
					values.push(category);
				}
				if (result === 'buy') {
					category = 4;
					values.push(category);
				}

				return addNewTask(values, db);
			})
			.catch(console.error);

		if (!req.body) {
			res.status(400).json({ error: 'invalid request: no data in POST body' });
			return;
		}
	});

	return router;
};
