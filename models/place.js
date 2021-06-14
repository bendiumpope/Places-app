const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//  name: {
//         type: String,
//         required: [true,'Please tell us your name'],
//         // validate: [validator.isAlpha, 'A tour name must only contain characters']
//     },    
//     email: {
//         type: String,
//         required: [true, 'A user must have an email'],
//         unique: true,
//         lowercase: true,
//         validate: [validator.isEmail, 'Please provide a valid email']
//     },    
//     photo: String,
//     role: {
//         type: String,
//         enum: ['user', 'guide', 'lead-guide', 'admin'],
//         default: 'user'
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required'],
//         minlength: 8,
//         select: false
//     },    
//     confirmPassword: {
//         type: String,
//         required: [true, 'ComfirmPassword is required'],
//         //this only works on CREATE and SAVE!!!
//         validate: {
//             validator: function (el){
//                 return el === this.password;
//             },
//             message: 'Passwords are not the same'
//         }
//     }
const placesSchema = new Schema({
    title: {
        type: String, 
        required: [true,'title must not be empty']
    },
    description: {
        type: String, 
        required: [true,'description must not be empty']
    },
    image: {
        type: String, 
        required: [true,'Please provide an image for the place']
    },
    address: {
        type: String, 
        required: [true,'Please provide a valid address']
    },
    location: {
        lat: {type: Number, required: true},
        lng: {type: Number, required: true}
    },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Place', placesSchema);