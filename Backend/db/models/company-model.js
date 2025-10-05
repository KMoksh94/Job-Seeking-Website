const mongoose = require("mongoose")
const companySchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  type : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  address : {
    house : {
      type : String,
      required : true
    },
    street : {
      type : String,
      required : true
    },
    city : {
      type : String,
      required : true
    },
    state : {
      type : String,
      required : true
    },
    pin : {
      type : String,
      required : true
    },
  },
  phone : {
    type : String,
    required : true
  },
  password : {
    type: String,
    required : true
  }
})

const Company = mongoose.model("Company", companySchema)
module.exports = Company