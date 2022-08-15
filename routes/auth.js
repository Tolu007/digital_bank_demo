const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require('../models/userSchema');

router.post('/', async (req, res) => {
    let user = await users.findOne({ number: req.body.number });
    if (!user) {
        return res.status(400).send(false);
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('false');
    }
    return res.send(true);
});

module.exports = router;