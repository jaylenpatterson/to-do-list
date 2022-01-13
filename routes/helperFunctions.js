const bcrypt = require('bcrypt');

// Insert new registered user into the database
const addUser = (user, db) => {
	const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

	const values = [ user.name, user.email, user.password ];
	return db.query(queryString, values).then((res) => res.rows[0]).catch((err) => console.log('Query Error:', err));
};

// Get tasks that based on user
const getUsersTasks = function(userid, db, filter) {
	const queryString = `
    SELECT *
    FROM tasks
    WHERE tasks.user_id = $1
    ${filter ? 'AND category = $2' : ''}
    ORDER BY tasks.start_date ASC;`;
	const value = [ userid ];
	if (filter) {
		value.push(filter);
	}
	return db.query(queryString, value).then((res) => res.rows).catch((err) => {
		console.error('query error', err.stack);
	});
};

const addNewTask = function(userid, db) {
	const text = `INSERT INTO tasks (user_id, title, start_date, urgency, category)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;

	const value = [ userid, title, start_date, category, urgency ];
	return db.query(text, value).then((res) => res.rows).catch((err) => {
		console.log(err.message);
	});
};

const deleteTask = function(id, db) {
	const text = `DELETE FROM tasks 
    WHERE id = ${'$1'};
  `;

	const value = [ id ];
	return db.query(text, value).then((res) => res.rows).catch((err) => {
		console.log(err.message);
	});
};

module.exports = {
	addUser,
	addNewTask,
	getUsersTasks,
	deleteTask
};
