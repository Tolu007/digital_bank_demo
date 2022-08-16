const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require('../models/userSchema');

router.post('/', async (req, res) => {
    console.log(req.body);
    let user = await users.findOne({ number: req.body.number });
    if (user) {
        return res.status(400).send({ message: 'User already exists' });
    }
    const newUser = new users({
        name: req.body.name,
        number: req.body.number,
        gender: req.body.gender,
        age: req.body.age,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    try {
        const saveUser = await newUser.save();
        return res.send({ message: 'Success' });
    } catch (err) {
        return res.send({ message: 'An error occured' });
    }
});

module.exports = router;