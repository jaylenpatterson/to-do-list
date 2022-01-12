const express = require('express');
const router = express.Router();
const searcher = require('../helpers/categorize.js');
const { getUsersTasks, addNewTask } = require('./helperFunctions');

module.exports = (db) => {
  router.get('/', (req, res) => {
    const userID = '1';
    if (!userID) {
      res.status(401).send('Not Logged in');
      return;
    }

    
    
    getUsersTasks(userID, db)
      .then(tasks => res.send(tasks))
      .catch(err => {
        res.send(err);
      });
  });


	router.post('/', (req, res) => {
  
	});

	return router;

};
