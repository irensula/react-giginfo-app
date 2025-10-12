const express = require('express');
require('./mongo'); // connect to mongo
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dbConfig = require('./utils/config');

dotenv.config(); // load environment variables

const app = express();

// middleware
let validateSchema = require('./middleware/validate');

// json schemas
let userschema = require('./schemas/userschema.json');

// routers
let indexRouter = require('./routes/index');
let gigsRouter = require('./routes/gigsRouter');
let registerRouter = require('./routes/registerRouter');
let loginRouter = require('./routes/loginRouter');

// core middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'build')));

// routes
app.use('/', indexRouter);
app.use('/api/gigs', gigsRouter);
app.use('/api/register', validateSchema(userschema), registerRouter);
app.use('/api/login', loginRouter);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not found' });
});
  
// global error handlier
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong' });
});

module.exports = app;