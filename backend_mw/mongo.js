const mongoose = require('mongoose');
const dbConfig = require('./utils/config');

mongoose.Promise = global.Promise;

const connectToMongo = async () => {
  try {
    await mongoose.connect(dbConfig.URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error: ", err.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;