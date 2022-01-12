const bcrypt = require('bcrypt');
const { text } = require('express');

// Insert new registered user into the database
const addUser = function(user, db) {
	const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

	const values = [ user.name, user.email, user.password ];
	return db.query(queryString, values).then((res) => res.rows[0]).catch((err) => console.log('Query Error:', err));
};

const addNewTask = function(values, db) {
	const text = `INSERT INTO tasks (title, start_date, end_date, category_id, user_id, urgency, complete)
		VALUES ($1, $2, $3, $4 $5, $6)
		RETURNING *;
		`;

	return db.query(text, values).catch((err) => {
			console.log(err.message);
		});
};

module.exports = {
	addUser,
	addNewTask
};
