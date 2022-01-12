/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { addUser } = require('./helperFunctions');

module.exports = (db) => {
  // Get current users
  router.get("/", (req, res) => {
    const userID = '1';
    if (userID) {
      db.query(`SELECT * FROM users WHERE id = $1;`, [userID])
      .then(data => {
        const users = data.rows[0];
        res.send({id: users.id, name: users.name, email: users.email});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    }
  });

  // Registration Users
  router.post('/', (req, res) => {
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

  return router;
};
