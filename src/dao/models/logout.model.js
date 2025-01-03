const mongoose = require('mongoose');
const { Schema } = mongoose;

const logoutSchema = new Schema({
    token: {
        type: String,
        required: true,
    }
}, {
    timestamps:
        true
});

module.exports = mongoose.model('logout', logoutSchema);