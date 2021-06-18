const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { 
        type: String, 
        required: [true,'Please tell us your name'] 
        
    },
    email: { 
        type: String, 
        required: [true, 'A user must have an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'] 
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minLength: 6 
    },
    image: { 
        type: String, 
        required: [true, 'Photo is required'], 
    },
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);