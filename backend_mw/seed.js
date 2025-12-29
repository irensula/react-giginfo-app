// ADDING SEEDS TO THE DATABASE

const mongoose = require('mongoose')
const dbConfig = require('./utils/config');
const Gig = require('./models/gig');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

mongoose.Promise = global.Promise;

const seedDatabase = async () => {
  try {
    
    await mongoose.connect(dbConfig.URL, {
      authMechanism: 'SCRAM-SHA-256'
    });

    console.log('Successfully connected to the database');

    await User.deleteMany({});
    await Gig.deleteMany({});

    const passwordHash = await bcrypt.hash("salasana", SALT_ROUNDS);
  
    const savedUser = await new User({
      username: "janedoe",
      password: passwordHash,
      phone: "0501112233",
      email: "jane@gmail.com"
    }).save();

    const gigsData = [
      {
        name: "Music Festival",
        artist: "Husky Rescue",
        add_image: "/public/huskyrescue.jpg",
        description: "description",
        gig_date: new Date(),
        time: "18:00",
        address: "Hämeenkatu 1, 33300",
        city: "Tampere",
        ticket_sale_link: "https://www.lippu.fi/",
        genre: "pop",
        artist_link: "huskyrescue.fi",
        rate: 5,
      },
      {
        name: "Rap Fest",
        artist: "Paperi T",
        add_image: "/public/paperit.png",
        description: "Rap festival",
        gig_date: new Date("2025-02-10"),
        time: "20:00",
        address: "Alekcanterinkatu 5",
        city: "Helsinki",
        ticket_sale_link: "https://lippu.fi",
        genre: "rap",
        artist_link: "paperit.com",
        rate: 4
      },
      {
        name: "Pop Fest",
        artist: "Sanni",
        add_image: "/public/sanni.jpg",
        description: "Pop stars in da house",
        gig_date: new Date("2025-03-01"),
        time: "19:00",
        address: "Hämeenkatu 11",
        city: "Tampere",
        ticket_sale_link: "https://lippu.fi",
        genre: "pop",
        artist_link: "sanni.fi",
        rate: 5
      },
      {
        name: "Rock Fest",
        artist: "Zemfira",
        add_image: "/public/zemfira.png",
        description: "Rock festival",
        gig_date: new Date("2025-04-05"),
        time: "19:00",
        address: "Hämeenkatu 10",
        city: "Tampere",
        ticket_sale_link: "https://lippu.fi",
        genre: "rock",
        artist_link: "zemfira.com",
        rate: 5
      },
      {
        name: "Pop Fest",
        artist: "Kärijä",
        add_image: "/public/kärijä.jpg",
        description: "Pop stars in da house",
        gig_date: new Date("2025-03-01"),
        time: "19:00",
        address: "Hämeenkatu 11",
        city: "Tampere",
        ticket_sale_link: "https://lippu.fi",
        genre: "pop",
        artist_link: "zemfira.com",
        rate: 5
      },
      {
        name: "Rock Fest",
        artist: "Rasmus",
        add_image: "/public/rasmus.jpg",
        description: "Rock festival",
        gig_date: new Date("2025-04-05"),
        time: "19:00",
        address: "Hämeenkatu 10",
        city: "Tampere",
        ticket_sale_link: "https://lippu.fi",
        genre: "rock",
        artist_link: "rasmus.com",
        rate: 5
      },
    ];

    await Gig.insertMany(
      gigsData.map(gig => ({
        ...gig,
        user_id: savedUser._id
      }))
    );

    const gigs = await Gig.find({});
    const users = await User.find({});

    console.log("All gigs:", gigs);
    console.log("All users:", users);

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

seedDatabase();