require('dotenv').config()

let PORT = process.env.PORT

let DATABASE_OPTIONS = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
}

let URL = process.env.DB_HOST + process.env.DB_DATABASE
let SECRET = "tosisalainensalasanainen"

module.exports = {
    DATABASE_OPTIONS,
    PORT, 
    URL,
    SECRET
}  