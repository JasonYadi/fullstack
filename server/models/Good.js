const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    icon: {
        type: String,
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Good', schema);