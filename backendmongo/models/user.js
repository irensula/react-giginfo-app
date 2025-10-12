const dbConfig = require('../config');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.URL, {
    //useNewUrlParser: true,
    user: dbConfig.DATABASE_OPTIONS.user,
    pass: dbConfig.DATABASE_OPTIONS.password,
    authSource: "admin"
}).then(() => {
    console.log('successfully connected to the database');
}).catch(err => {
    console.log(dbConfig.URL)
    console.log('error connecting to the database', err.message);
    process.exit();
});
// const mongoose = require('../mongo');
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    email: String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    }
})

module.exports = mongoose.model('User', userSchema)