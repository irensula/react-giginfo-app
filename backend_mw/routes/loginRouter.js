const express = require('express');
const router = express.Router();
const config = require('../utils/config');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    console.log(req.body);

    try {
        const dbUser = await User.findOne( { username });
        
        if (!dbUser) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const passwordCorrect = await bcrypt.compare(password, dbUser.password);
    
        if(!passwordCorrect) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
     
        const userForToken = {
            username: dbUser.username,
            id: dbUser._id
        };
    
        const token = jwt.sign(userForToken, process.env.DB_SECRET, { expiresIn: '1h' });
        console.log('JWT_SECRET:', process.env.DB_SECRET);
    
        res.status(200).send({
            token,
            username: dbUser.username,
            id: dbUser._id,
            role: "regularuser"
        });
    } catch (err) {
        console.error('Login failed:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}); 

module.exports = router;