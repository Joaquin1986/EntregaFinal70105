const mongoose = require('mongoose');
const { Schema } = mongoose;

const petSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    specie: {
        type: String,
        required: true
    },
    birthDate: Date,
    adopted: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    image: String,
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('pet', petSchema);