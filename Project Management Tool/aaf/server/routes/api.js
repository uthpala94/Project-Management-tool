const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const ApiController = require('../controllers/api');

const db = "mongodb://uthpala:1qaz@ds135810.mlab.com:35810/projectmanagementdb";

mongoose.Promise = global.Promise;

mongoose.connect(db,function(err){
    if(err){
        console.error("Database not connect "+err);
    }
});


//get all projects
router.get('/projects',checkAuth, ApiController.getAllProjects);

//get single project by id
router.get('/projects/:id',checkAuth, ApiController.getSingleProject);

//add project
router.post('/project', ApiController.insertProject);

//update project by id
router.put('/project/:id',checkAuth, ApiController.updateProject);

//delete project by id
router.delete('/project/:id', ApiController.deleteProject);

//search project by title
router.get('/projects/search/:projectTitle',checkAuth, ApiController.searchProject);


/*exports.getProjects=(req,res,next)=>{
    const N = req.params.projectTitle;
    Project.find([{projectTitle:{"$regex":N,"$options":"i"}}]).select('_id projectTitle url description')
    .exec()
    .then(doc=>{
        if(err){
            console.log("Error in retreiving projects ");
        }else{
            res.json(projects);
        }
    })
}*/

module.exports = router;
