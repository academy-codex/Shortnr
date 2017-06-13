var mongoose = require('mongoose');

var Count = mongoose.model('counter', {
    value: {
        type:Number,
        required: true
    }
});

module.exports = {Count:Count};