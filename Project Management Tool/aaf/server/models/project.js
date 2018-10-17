const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectTitle:{type:String, require:true},
    url:{type:String, require:true},
    description:String

});
module.exports = mongoose.model('project',projectSchema,'projects');