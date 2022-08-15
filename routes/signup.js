const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require('../models/userSchema');

router.post('/', async (req, res) => {
    console.log(req.body);
    let user = await users.findOne({ number: req.body.number });
    if (user) {
        return res.status(400).send('User already exists');
    } else {
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
            res.json(saveUser);
        } catch (err) {
            res.json({ message: err });
        }
    }
});

module.exports = router;