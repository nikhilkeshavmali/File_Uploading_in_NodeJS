const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/sampledb");
    console.log("MongoDB connected successfully");
    console.log(mongoose.connection.readyState);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDB();
module.exports = connectDB;
