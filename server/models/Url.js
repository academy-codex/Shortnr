var mongoose = require('mongoose');

var Url = mongoose.model('Url', {
    url: {
        type: String,
        required: true
    },
    id: {
        type:Number,
        required: true
    }
});

module.exports = {Url:Url};