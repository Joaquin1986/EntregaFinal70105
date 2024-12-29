const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
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
        ref: 'user',
        default: null
    },
    image: String,
    deleted: {
        type: Boolean,
        default: false
    }
});

petSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('pet', petSchema);