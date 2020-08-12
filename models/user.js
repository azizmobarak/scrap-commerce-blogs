const mongoose = require('mongoose');
const data = require('./data');


const userSchema = mongoose.Schema({
    email: String,
    name: String,
    password: String,
    date: Date
})

const User = mongoose.model('User', userSchema);

module.exports = User;