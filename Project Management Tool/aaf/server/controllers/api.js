const mongoose = require('mongoose');
const Project = require('../models/project');
const checkAuth = require('../middleware/check-auth');

//get all projects 
exports.getAllProjects = function(req,res){
    console.log('Get requset for all projects');
    Project.find({})
    .exec(function(err,projects){
        if(err){
            console.log("Error in retreiving projects ");
        }else{
            res.json(projects);
        }
    });
}

//get single project 
exports.getSingleProject = function(req,res){
    console.log('Get requset for a single project.');
    Project.findById(req.params.id)
    .exec(function(err,project){
        if(err){
            console.log("Error in retreiving project ");
        }else{
            res.json(project);
        }
    });
}

//add new project
exports.insertProject = function(req,res){
    console.log('Post a project ');
    var newProject = new Project();

    newProject.projectTitle = req.body.projectTitle;
    newProject.url = req.body.url;
    newProject.description = req.body.description;

    newProject.save(function(err,insertedProject){
        if(err){
            console.log('Error saving project ');
        }else{
            res.json(insertedProject);
        }
    });
}


//update project
exports.updateProject = function(req,res){
    console.log('Update a project ');
    Project.findByIdAndUpdate(req.params.id,
        {
        $set: {projectTitle: req.body.projectTitle, url: req.body.url, description: req.body.description},
    },
    {
        new: true
    },
    function(err,updatedProject){
        if(err){
            res.send("Error updating project");
        }else{
            res.json(updatedProject);
        }
    }
);
}

//delete project
exports.deleteProject = function(req,res){
    console.log('Deleting a project ');
    Project.findByIdAndRemove(req.params.id, function(err,deletedProject){
        if(err){
            res.send("Error deleting project ");
        }else{
            res.json(deletedProject);
        }
    });
}

//search project by project title
exports.searchProject = function(req,res){
    const N = req.params.projectTitle;
   Project.find().or([{projectTitle:new RegExp(N,'i')},{url:new RegExp(N,'i')}]).select('_id projectTitle url description')
   .exec()
   .then(doc=>{
       if(doc){
           res.json(doc);
       }
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({
           error:err
       });
   })
}