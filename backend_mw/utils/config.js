require('dotenv').config();

const URL = `mongodb://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASS)}@127.0.0.1:27017/${process.env.DB_DATABASE}?authSource=admin`;

console.log("Mongo URL:", URL);

module.exports = { URL };