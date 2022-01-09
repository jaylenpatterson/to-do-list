const bcrypt = require('bcrypt');

// Insert new registered user into the database
const addUser = function(user, db) {
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

module.exports = {
  addUser
};
