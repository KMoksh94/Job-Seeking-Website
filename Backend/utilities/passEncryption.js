const bcrypt = require('bcrypt')

async function encrpytPassword (plainPassword){
  return await bcrypt.hash(plainPassword,15)
}

async function comparePassword (plainPassword,hash){
  return await bcrypt.compare(plainPassword,hash)
}

module.exports = {encrpytPassword,comparePassword}
