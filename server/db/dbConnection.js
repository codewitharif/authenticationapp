const mongoose = require("mongoose");
//const dotenv = require("dotenv");
//dotenv.config({ path: "../config.env" });

const connectDB = async () => {
  try {
    const port = process.env.PORT;
    const DB = process.env.DATABASE;
    await mongoose.connect(DB);

    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
