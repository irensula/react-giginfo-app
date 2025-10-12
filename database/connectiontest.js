const mongoose = require('mongoose');
 const dbConfig = require('./config');

 mongoose.Promise = global.Promise;

 mongoose.connect(dbConfig.url, {
     useNewUrlParser: true,
     user: dbConfig.user,
     pass: dbConfig.pwd,
     authSource: "admin"
 }).then(() => {
     console.log('successfully connected to the database');
 }).catch(err => {
     console.log('error connecting to the database', err);
     process.exit();
 });