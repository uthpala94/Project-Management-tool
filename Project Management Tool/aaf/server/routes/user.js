const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const UserController = require('../controllers/user');


//register new user
router.post('/register',UserController.registerUser);

//user login
router.post('/login',UserController.loginUser);

//delete user
router.delete('/:userId',UserController.deleteUser);

//find user by
router.get('/profile/:name',checkAuth,UserController.findUser);



module.exports = router;