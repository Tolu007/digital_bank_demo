const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    password: {
        type: String,
        required: true
    },
    number: {
        require: true,
        type: String,
        unique: true
    },
    gender: {
        require: true,
        type: String
    },
    age: {
        require: true,
        type: String
    },
    balance: {
        require: true,
        type: String,
        default: 0
    },
    transactions: [{
        _id: String,
        type: Object,
        amount: Number,
        fromAccountId: String,
        toAccountId: String,
        description: String,
        transactionDate: Date
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
},
);

// exports default mongoose.model('userInfo', userSchema);

module.exports = mongoose.model('userInfo', userSchema);