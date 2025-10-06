const mongoose = require("mongoose")

module.exports = async function connectionDB(){
  try {
    const res = await mongoose.connect(process.env.connection_link)
    console.log(`Connected to Database`);
  } catch (error) {
    console.log(error);
  }
}