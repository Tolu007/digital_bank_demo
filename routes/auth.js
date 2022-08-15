const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require('../models/userSchema');

router.post('/', async (req, res) => {
    let user = await users.findOne({ number: req.body.number });
    if (!user) {
        res.status(400).send('Invalid email or password');
    } else {
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(400).send('Invalid email or password');
        }
    }
    res.send(true);
});

module.exports = router;