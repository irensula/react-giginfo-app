const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
    name: String,
    artist: String, 
    add_image: String,
    description: String,
    gig_date: Date,
    time: String,
    address: String,
    city: String,
    ticket_sale_link: String,
    genre: String,
    artist_link: String,
    rate: Number,
    user_id: String
})

gigSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    }
})

module.exports = mongoose.model('Gig', gigSchema) 