const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const TaskController = require('../controllers/task');


//get all tasks
router.get('/tasks',checkAuth,TaskController.getAllTasks);

//get task by id
router.get('/tasks/:id',checkAuth,TaskController.getSingleTask);

//add new task
router.post('/task',checkAuth,TaskController.insertTask);

//update task by id
router.put('/task/:id',checkAuth,TaskController.updateTask);

//delete task by id
router.delete('/task/:id',checkAuth,TaskController.deletetask);



module.exports = router;