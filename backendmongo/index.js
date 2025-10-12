require('dotenv').config();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const dbConfig = require('./config');
const PORT = dbConfig.PORT;

const Gig = require('./models/gig')
const User = require('./models/user')
const express = require('express')
const app = express()
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})
// token
const getTokenFrom = req => {
    const authorization = req.get('authorization');
    console.log("authorization", authorization);
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    } else {
        return null
    }
}  
// get all gigs
app.get('/api/gigs', (req, response) => {
    Gig.find({}).then(gigs => {
        response.json(gigs)
    })
}) 
// register
app.post('/api/register', (req, res) => {
const user = req.body

if (
    user.username === undefined ||
    user.email === undefined ||
    user.phone === undefined || 
    user.password === undefined
    ) {
    return response.status(400).json({ error: 'content missing' })
}
if (
    !user.username?.trim() ||
    !user.email?.trim() ||
    !user.phone?.trim() ||
    !user.password?.trim()
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }
const saltRounds = 10;
console.log(user);
    
bcrypt.hash(user.password, saltRounds)
    .then((passwordHash) => {

        const newUser = new User({
            username: user.username,
            password: passwordHash,
            phone: user.phone,
            email: user.email
        })
        
        newUser.save().then(savedUser => {
            res.json(savedUser)
            console.log("register toimii")
        })

    })
    .catch((err) => {
        console.log('login failed')
        res.status(500).json({ error: err })
    })
})    
// login
app.post('/api/login', (req, res) => {
    const body = req.body;
    console.log(body);

    User.find( {username: body.username} ).then(dbuser => {
        console.log(dbuser)

        if (dbuser.length == 0) {
            return res.status(401).json(
                { error: "invalid username or password" }
            )
        }
        const tempUser = dbuser[0];
        bcrypt.compare(body.password, tempUser.password)
            .then((passwordCorrect) => {
                if (!passwordCorrect) {
                    return res.status(401).json(
                        { error: "invalid username or password" }
                    )
                } 

                //token
                const userForToken = {
                    username: tempUser.username,
                    id: tempUser._id
                } 

                const token = jwt.sign(userForToken, dbConfig.SECRET)

                res.status(200).send({
                    token,
                    username: tempUser.username,
                    id: tempUser._id,
                    role: "regularuser"
                })
            })
    })
    .catch((err) => {
        console.log('login failed')
        res.status(500).json({ error: err })
    })
}); 
// add gig  
app.post('/api/gigs', (req, res) => {
    const token = getTokenFrom(req);
    console.log(token);

    if(!token){
        return res.status(401).json({ error: "auth token missing" })
    }

    let decodedToken = null;

    try{
        decodedToken = jwt.verify(token, dbConfig.SECRET);
    }
    catch(error){
        console.log("jwt error")
        return res.status(401).json({ error: "invalid token" });
    }
    
    if(!decodedToken || !decodedToken.id){
        return res.status(401).json({ error: "invalid token" })
    }

    const body = req.body
    
    if (body.name === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }
    
    const gig = new Gig({
        //important: body.important || false,
        name: body.name,
        artist: body.artist, 
        add_image: body.add_image,
        description: body.description,
        gig_date: new Date(),
        time: body.time,
        address: body.address,
        city: body.city,
        ticket_sale_link: body.ticket_sale_link,
        genre: body.genre,
        artist_link: body.artist_link,
        rate: body.rate,
        user_id: decodedToken.id
    })
    
    gig.save().then(savedGig => {
        res.json(savedGig)
    })
})  
// get gig by id
app.get('/api/gigs/:id', (req, response) => {
    Gig.findById(req.params.id).then(gig => {
        response.json(gig);
    })
})     
// delete gig by id
app.delete('/api/gigs/:id', async (req, res, next) => {
    const token = getTokenFrom(req);
    console.log(token);

    if(!token){
        return res.status(401).json({ error: "auth token missing" })
    }
    let decodedToken = null;
    try {
        decodedToken = jwt.verify(token, dbConfig.SECRET);
    } catch(error) {
        console.log("jwt error", error.message);
        return res.status(401).json({ error: "invalid token" });
    }
    
    if(!decodedToken || !decodedToken.id){
        return res.status(401).json({ error: "invalid token" })
    }
    try {
        const gig = await Gig.findById(req.params.id);
        console.log("Decoded Token:", decodedToken);
        console.log("Gig User ID:", gig.user_id);
        if (!gig) {
            return res.status(404).json({ error: "gig not found" });
        }
        if (gig.user_id.toString() !== decodedToken.id) {
            return res.status(403).json({ error: "not authorized to delete this gig" });
        }
        await Gig.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        next (error);
    }
})  
app.delete('/api/gigs/:id', (req, response, next) => {
    Gig.findByIdAndDelete(req.params.id)
        .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})  
// update gig by id
app.put('/api/gigs/:id', (req, response, next) => {
    const body = req.body
  
    const gig = {
        name: body.name,
        artist: body.artist, 
        add_image: body.add_image,
        description: body.description,
        gig_date: new Date(),
        time: body.time,
        address: body.address,
        city: body.city,
        ticket_sale_link: body.ticket_sale_link,
        genre: body.genre,
        artist_link: body.artist_link,
        rate: body.rate
    }
  
    Gig.findByIdAndUpdate(req.params.id, gig, { new: true })
      .then(updatedGig => {
        response.json(updatedGig)
      })
      .catch(error => next(error))
  })