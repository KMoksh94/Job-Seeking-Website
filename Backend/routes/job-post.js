const express = require("express")
const requireLogin = require("../middlewares/requireLogin");
const Job = require("../db/models/job-model");
const Company = require("../db/models/company-model");
const router = express.Router()

router.post("/create-job-post",requireLogin,async(req,res)=>{
  try {
   const companyCheck = await Company.findById(req.user._id)
   if(!companyCheck){return res.status(400).json({msg : `Not a registered Company`})}
   const {title,salary,exp,jobDesc} = req.body;
   if(!title || !salary || !exp || !jobDesc){return res.status(400).json({msg : `Kindly provide all details`})}
   const newJobPost = new Job({title,salary,exp,jobDesc,postedBy : req.user._id})
   await newJobPost.save()
   return res.status(200).json({msg : `Job successfully posted`}) 
  } catch (error) {
     console.log(`Error : ${error}`);
     res.status(500).json({msg : `Internal Server Error`})
  }
})

router.get("/apply-job/:id",requireLogin,async(req,res)=> {
  try {
    const job = await Job.findById(req.params.id)
    if(!job){return res.status(400).json({msg : `No such job listed with the requested id`})}
    const updateJob = await Job.findByIdAndUpdate(req.params.id,{
    $push : {applications : {_id : req.user._id, name : req.user.name}}
    })
    return res.status(200).json({msg : `Applied successfully`})
  } catch (error) {
     console.log(`Error : ${error}`);
  }
})

module.exports = router