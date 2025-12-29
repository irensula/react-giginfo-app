const mongoose = require('mongoose');
const dbConfig = require('./utils/config');

mongoose.connect(dbConfig.URL, {
    authMechanism: 'SCRAM-SHA-256'
})
.then(() => console.log('Successfully connected to the database'))
.catch(err => {
    console.error('Error connecting to the database', err);
    process.exit(1);
});