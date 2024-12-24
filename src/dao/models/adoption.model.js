const mongoose = require('mongoose');
const { Schema } = mongoose;

const petSchema = new Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    pet: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'pet'
    }
}, {
    timestamps:
        true
});

module.exports = mongoose.model('adoption', petSchema);