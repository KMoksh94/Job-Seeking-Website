const express = require("express");
const { encrpytPassword, comparePassword } = require("../utilities/passEncryption");
const Company = require("../db/models/company-model.js");
const User = require("../db/models/user-model.js")
const jwt = require("jsonwebtoken")
const router = express.Router()


router.post("/signup/company", async(req,res)=> {
  const {name,email,type,address,phone,password} = req.body;
  if(!name || !email || !type || !address || !phone || !password){
    return res.status(400).json({msg : "Kindly provide all details"})
  }
   const isCompanyExists = await Company.findOne({$or : [{name}, {email}, {phone}]})
   if(isCompanyExists){
    return res.status(400).json({msg : `Company Name/Email/Phone already exists.`})
   }
  const hashPassword = await encrpytPassword(password)
  const company = new Company({name,email,type,address,phone,password:hashPassword})
  await company.save()
  return res.status(200).json({msg : `Company Signed Up Successfully`})
})

router.post("/signup/user", async (req,res)=> {
  const {name,email,phone,password,skills} = req.body;
  if(!name || !email || !phone || !password){
    return res.status(400).json({msg : `Kindly provide all the required fields`})
  }
  const isUserExists = await User.findOne({$or : [{phone}, {email}]})
  if(isUserExists){
    return res.status(400).json({msg : `User with this phone/email already exists`})
  }
  const hashPassword = await encrpytPassword(password)
  const user = new User({name,email,phone,password : hashPassword,skills})
  user.save()
  return res.status(200).json({msg : `User successfully registered`})
})

router.post("/login/company", async (req,res)=> {
  const {name,password} = req.body;
  if(!name || !password){
    return res.status(400).json({msg : `Kindly fill all fields`})
  }
  const isCompanyExists = await Company.findOne({name})
  if(!isCompanyExists){
    return res.status(400).json({msg : `User does not exists. Kindly Signup`})
  }
  const comparePass = await comparePassword(password,isCompanyExists.password)
  if(!comparePass){
    return res.status(404).json({msg : `Incorrect Password`})
  }
  isCompanyExists.password = undefined
  const token = jwt.sign({user : isCompanyExists},process.env.SECRET_KEY)
  return res.status(200).json({msg : `Company Successfully logged in`,token})
})

router.post("/login/user", async (req,res)=> {
  const {name,password} = req.body;
  if(!name || !password){
    return res.status(400).json({msg : `Kindly fill all fields`})
  }
  const isUserExists = await User.findOne({name})
  if(!isUserExists){
    return res.status(400).json({msg : `User does not exists. Kindly Signup`})
  }
  const comparePass = await comparePassword(password,isUserExists.password)
  if(!comparePass){
    return res.status(404).json({msg : `Incorrect Password`})
  }
  isUserExists.password = undefined
  const token = jwt.sign({user : isUserExists},process.env.SECRET_KEY)
  return res.status(200).json({msg : `User Successfully logged in`,token})
})

module.exports = router