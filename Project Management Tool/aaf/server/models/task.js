const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName:{type:String, require:true},
    startDate:{type:String, require:true},
    endDate:{type:String, require:true},
    user:{type:String, require:true},
    projectTitle:{type:String, require:true},
    description:String

});
module.exports = mongoose.model('task',taskSchema,'tasks');