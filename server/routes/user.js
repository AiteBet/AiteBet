const express = require('express');

const usersController = require('../controllers/usersController');

const router = express.Router();

// below we will have all CRUD routing

// read functionality for user
router.get('/:id', usersController.getAllUsers, (req,res) => {
  return res.status(200).json(res.locals.allUsers)
})

router.post('/signup', usersController.signUp, (req, res) => {
  return res.status(201).json(res.locals.newUser);
});

router.post('/login', usersController.login,  (req, res) => {
  return res.status(200).json(res.locals.currUser);
});

router.patch('/', usersController.addFunds, (req, res) => {
  return res.status(200).send("Your funds have been added");
});

module.exports = router;




