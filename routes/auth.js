const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require('../models/userSchema');

router.post('/', async (req, res) => {
    let user = await users.findOne({ number: req.body.number });
    if (!user) {
        return res.status(400).send({ message: 'failed' });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send({ message: 'failed' });
    }
    let message = 'Success';
    let payload = { ...message, ...user };
    return res.send(payload);
});

module.exports = router;