const mongoose = require('mongoose');
const dbConfig = require('../database/config');

mongoose.Promise = global.Promise;

const connectToMongo = () => {
  return mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: dbConfig.user,
    pass: dbConfig.pwd,
    authSource: "admin"
  });
};

module.exports = connectToMongo;

// ADDING SEEDS TO THE DATABASE

// const mongoose = require('mongoose')
// const dbConfig = require('../database/config');

// //const password = process.argv[2];
// const Gig = require('./models/gig');
// const User = require('./models/user');
//  mongoose.Promise = global.Promise;

//  mongoose.connect(dbConfig.url, {
//      useNewUrlParser: true,
//      user: dbConfig.user,
//      pass: dbConfig.pwd,
//      authSource: "admin"
//  }).then(() => {
//      console.log('successfully connected to the database');
//  }).catch(err => {
//      console.log('error connecting to the database', err);
//      process.exit();
//  });

// const user = new User({
//     username: "janedoe",
//     password: "salasana",
//     phone: "0501112233",
//     email: "jane@gmail.com"
// })

// user.save()
//     .then(savedUser => {
//         const gig = new Gig({
//             name: "Music Festival",
//             artist: "Husky Rescue",
//             add_image: "/public/huskyrescue.jpg",
//             description: "description",
//             gig_date: new Date(),
//             time: "18:00",
//             address: "Hämeenkatu 1, 33300",
//             city: "Tampere",
//             ticket_sale_link: "https://www.lippu.fi/",
//             genre: "pop",
//             artist_link: "huskyrescue.fi",
//             rate: 5,
//             user_id: savedUser._id
//         });
//         return gig.save();
//     })
//     .then(savedGig => {
//         return Promise.all([
//             Gig.find({}),
//             User.find({})
//         ]);
//     })
//     .then(([gigs, users]) => {
//         console.log("All gigs: ", gigs);
//         console.log("All users", users);
//     })
//     .catch(err => {
//         console.error("Error: ", err);
//     })
//     .finally(() => {
//         mongoose.connection.close();
//     });