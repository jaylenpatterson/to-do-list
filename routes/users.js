/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const { addUser } = require('./helperFunctions')

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

// Registration Users
router.post('/', req, body => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  addUser(user, db)
  .then(user => {
    if(!user) {
      res.send({error: 'Error'});
      return;
    }
    req.session.userId = user.id;
    res.send('Logged in');
  })
  .catch(err => res.send(err));
});
