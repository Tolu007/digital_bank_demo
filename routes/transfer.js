const express = require('express');
const router = express.Router();
const users = require('../models/userSchema');

// import users from '../models/userSchema';
const history = require('../models/transactionHistorySchema');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    const amount = req.body.amount;
    const toAccount = req.body.toAccount;
    const fromAccount = req.body.fromAccount;
    const description = req.body.description;
    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let toUser = await users.findOne({ "number": toAccount });
    let fromUser = await users.findOne({ "number": fromAccount });
    if (!toUser) {
        return res.status(404).send('Account cannot be found');
    } if (!fromUser) {
        return res.status(404).send('Account cannot be found');
    }

    let toNewAmount = parseFloat(toUser.balance, 10) + parseFloat(amount);
    let fromNewAmount = parseFloat(fromUser.balance) - parseFloat(amount);

    try {
        const updateToTransfer = await users.updateOne({
            number: toAccount
        }, { $set: { balance: toNewAmount } });
        const updateFromTransfer = await users.updateOne({ number: fromAccount }, { $set: { balance: fromNewAmount } });
        const updateToHistory = await users.updateOne({ number: toAccount }, {
            $push: {
                "transactions": {
                    "_id": mongoose.mongo.ObjectId(),
                    "type": "credit",
                    "amount": amount,
                    "fromAccount": fromAccount,
                    "toAccount": toAccount,
                    "description": description,
                    "transactionDate": day + "/" + month + "/" + year
                }
            }
        });
        const updateFromHistory = await users.updateOne({ number: fromAccount }, {
            $push: {
                "transactions": {
                    "_id": mongoose.mongo.ObjectId(),
                    "type": "debit",
                    "amount": amount,
                    "fromAccountId": fromAccount,
                    "toAccountId": toAccount,
                    "description": description,
                    "transactionDate": day + "/" + month + "/" + year
                }
            }
        });
        return res.send(updateToHistory);
    } catch (error) {
        res.json({ "message": error });
    }
});

router.get('/:number', async (req, res) => {
    const number = req.params.number;
    let user = await users.findOne({ number: number });
    let transactionHistory = user.transactions;
    return res.send(transactionHistory);


});

module.exports = router;