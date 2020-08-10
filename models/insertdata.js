const mongoose = require('mongoose');


const Schemadata = mongoose.Schema({
    data: Array
})

const data = mongoose.model('data', Schemadata);

module.exports = data;