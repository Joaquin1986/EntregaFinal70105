const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const adoptionSchema = new Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    pet: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'pet'
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps:
        true
});

adoptionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('adoption', adoptionSchema);