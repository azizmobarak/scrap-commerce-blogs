const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const Port = process.env.PORT || 2000
const router = require('./routes');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

app.use('/', router);

mongoose.connect(process.env.CONNECTION, { useNewUrlParser: true }, (err) => {
    if (err) console.log(err);
    console.log('db');
})

app.listen(Port, () => {
    console.log("connected in " + Port);
})