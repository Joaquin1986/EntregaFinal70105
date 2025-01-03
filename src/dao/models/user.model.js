const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "el nombre es obligatorio"],
    },
    last_name: {
        type: String,
        required: [true, "el apellido es obligatorio"],
    },
    email: {
        type: String,
        required: [true, "el email es obligatorio"],
        unique: true,
        index: true
    },
    age: {
        type: Number,
        required: [true, "la edad es obligatoria"]
    },
    password: {
        type: String,
        required: [true, "el password es obligatorio"]
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        required: [true, "identificación del carrito es obligatoria"],
        index: true,
        default: null
    },
    role: {
        type: String,
        default: 'user'
    },
    pets: {
        type: [
            {
                _id: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: 'pet'
                }
            }
        ],
        default: []
    }
}, { timestamps: true });

userSchema.pre('findOne', function () {
    this.populate('cart');
    this.populate('pets._id', 'name specie image birthDate adopted');
});

userSchema.pre('findById', function () {
    this.populate('cart');
    this.populate('pets._id', 'name specie birthDate image adopted');
});

module.exports = mongoose.model('user', userSchema);

