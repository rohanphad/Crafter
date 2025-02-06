const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("trying to connect MongoDB...");
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
