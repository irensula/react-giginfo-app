const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/user');

const config = require('../utils/config')
const options = config.DATABASE_OPTIONS;
// app.use('/api/register', validateSchema(userschema), registerRouter);
router.post('/', async (req, res, next) => {
    const user = req.body
    const { username, email, phone, password } = req.body;
if (
    !username.trim() ||
    !email.trim() ||
    !phone.trim() || 
    !password.trim()
    ) {
    return res.status(400).json({ error: 'All fields must not be empty' })
}

try {
    const existingUser = await User.findOne({
        $or: [
            { username: username.trim() },
            { email: email.trim() },
            { phone: phone.trim() }
        ]
    });

    if (existingUser) {
        return res.status(400).json({error: 'User already exists' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        username: username.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: passwordHash
    });
      
    const savedUser = await newUser.save();
    console.log("Register successfull");
    res.status(201).json(savedUser);
} catch(err) {
        console.error('Register failed:', err);
        res.status(500).json({ error: 'Something went wrong' })
    }
})

module.exports = router;
