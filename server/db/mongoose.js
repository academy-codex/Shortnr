var mongoose = require('mongoose');

// Connecting to the DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Shortnr');

module.exports = {mongoose: mongoose};