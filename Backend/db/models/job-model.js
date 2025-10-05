const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const jobSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  salary : {
    type : String,
    required : true
  },
  exp : {
    type : String,
    required : true
  },
  jobDesc : {
    type : String,
  },
  postedBy : {
    type : ObjectId,
    ref : "Company"
  },
  applications : [{
    _id : {type : ObjectId,ref : "User"},
    name : {type : String}
  }]
})

const Job = mongoose.model("Job", jobSchema);
module.exports = Job