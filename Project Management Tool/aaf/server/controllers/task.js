const mongoose = require('mongoose');
const Task = require('../models/task');

//get all tasks
exports.getAllTasks = function(req,res){
    console.log('Get requset for all tasks');
    Task.find({})
    .exec(function(err,tasks){
        if(err){
            console.log("Error in retreiving tasks ");
        }else{
            res.json(tasks);
        }
    });
}

//get single task
exports.getSingleTask = function(req,res){
    console.log('Get requset for a single task.');
    Task.findById(req.params.id)
    .exec(function(err,task){
        if(err){
            console.log("Error in retreiving task ");
        }else{
            res.json(task);
        }
    });
}

//add new task
exports.insertTask = function(req,res){
    console.log('Post a task ');
    var newTask = new Task();

    newTask.taskName = req.body.taskName;
    newTask.startDate = req.body.startDate;
    newTask.endDate = req.body.endDate;
    newTask.user = req.body.user;
    newTask.projectTitle = req.body.projectTitle;
    newTask.description = req.body.description;


    newTask.save(function(err,insertedTask){
        if(err){
            console.log('Error saving task ');
        }else{
            res.json(insertedTask);
        }
    });
}

//update task
exports.updateTask = function(req,res){
    console.log('Update a task ');
    Task.findByIdAndUpdate(req.params.id,
        {
        $set: {taskName: req.body.taskName, startDate: req.body.startDate, endDate: req.body.endDate, user: req.body.user, description: req.body.description,},
    },
    {
        new: true
    },
    function(err,updatedTask){
        if(err){
            res.send("Error updating task");
        }else{
            res.json(updatedTask);
        }
    }
);
}

//delete task
exports.deletetask = function(req,res){
    console.log('Deleting a task ');
    Task.findByIdAndRemove(req.params.id, function(err,deletedTask){
        if(err){
            res.send("Error deleting task ");
        }else{
            res.json(deletedTask);
        }
    });
}