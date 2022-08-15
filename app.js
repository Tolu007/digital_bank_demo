const express = require('express');
const app = express();
const mongoose = require('mongoose');

// import { mongoose } from 'mongoose';



require('dotenv/config');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));



//ROUTES
const signupRoute = require('./routes/signup');
const authRoute = require('./routes/auth');
const transferRoute = require('./routes/transfer');

app.use('/users/signup', signupRoute);
app.use('/users/auth', authRoute);
app.use('/users/transfer', transferRoute);

app.get('/', (req, res) => {
    res.send("You are connected!");
});

//CONNECT TO DATABASE
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewURLParser: true },
    () => {
        console.log("Connected to Database!");
    }
);

app.listen(process.env.PORT || 3000);

