const bcrypt = require('bcrypt');

// Insert new registered user into the database
const addUser = (user, db) => {
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  const values = [user.name, user.email, user.password];
  return db.query(queryString, values)
  .then(res => res.rows[0])
  .catch(err => console.log('Query Error:', err));
};


// Get tasks that based on user
const getUsersTasks = function(userid, db) {
  const queryString = `
		SELECT *
  	FROM tasks
  	WHERE tasks.user_id = $1
  	ORDER BY tasks.date_created ASC;`;
  const value = [userid];
  return db.query(queryString, value)
    .then(res => res.rows)
    .catch(err => {
      console.error('query error', err.stack);
    });
};

module.exports = {
  addUser,
  getUsersTasks
};
