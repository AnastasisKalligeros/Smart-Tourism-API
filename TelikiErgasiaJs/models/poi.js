const mongoose = require('mongoose');

const poiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    },
    photo: String
});

module.exports = mongoose.model('POI', poiSchema);
