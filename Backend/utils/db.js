const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
// mongoose.connect(URI)

const connetToDb = async () => {
   await  mongoose.connect(URI)
   console.log("connected to DB")
  try {
  } catch (err) {
    console.log(err, "db error");
  }
};


module.exports = connetToDb
