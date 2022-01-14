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

const addNewTask = function(userid, description, category, db) {
  const date = new Date();
	const text = `INSERT INTO tasks (user_id, description, start_date, category)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;

	const value = [ userid, description, date, category ];

	return db.query(text, value).then((res) => res.rows).catch((err) => {
		console.log(err.message);
	});
};

const deleteTask = function(id, db) {
	const text = `DELETE FROM tasks
    WHERE id = ${'$1'}
    RETURNING *;
  `;

	const value = [ id ];
	return db.query(text, value).then((res) => res.rows).catch((err) => {
		console.log(err.message);
	});
};

const editTask = function(userid, category, description, taskID, db) {
  let queryString = `UPDATE tasks SET`;

  const queryParams = [];

  if (category) {
    queryParams.push(category);
    queryString += ` category = $${queryParams.length}`;
  }
  if (description) {
    queryParams.push(description);
    queryString += `, description = $${queryParams.length}`;
  }

  queryParams.push(userid);
  queryString += ` WHERE user_id = $${queryParams.length}`;
  queryParams.push(taskID);
  queryString += ` AND id = $${queryParams.length}
  RETURNING *;
  `;

  return db.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => {
    console.log('Query Error:', err);
  });
};

module.exports = {
	addUser,
	addNewTask,
	getUsersTasks,
	deleteTask,
  editTask
};
