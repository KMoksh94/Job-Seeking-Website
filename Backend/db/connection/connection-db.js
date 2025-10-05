const mongoose = require("mongoose")

module.exports = async function connectionDB(){
  try {
    const res = await mongoose.connect("mongodb+srv://kmoksh94_db_user:kmoksh94Assignment1@cluster0.4dibjog.mongodb.net/")
    console.log(`Connected to Database`);
  } catch (error) {
    console.log(error);
  }
}