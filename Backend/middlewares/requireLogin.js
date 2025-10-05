const jwt = require('jsonwebtoken')

async function requireLogin(req,res,next){
  const {authorization} = req.headers;
  if(!authorization){
    res.status(400).json({msg : `You must be logged in!`})
  }
  try {
   let token = authorization.replace("Bearer ", "");
  let istokenVerified = jwt.verify(token,process.env.SECRET_KEY)
  if(!istokenVerified){res.status(401).json({msg : `Invalid token`})}
  req.user = istokenVerified.user
  next() 
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}

module.exports = requireLogin;