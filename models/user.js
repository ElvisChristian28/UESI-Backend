const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    phone_number:{
        type: String,
        required: true,
        unique: true,
        minLength: 10,
        maxLength: 10
    },
    address:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    pincode:{
        type: String,
        required: true,
        minLength: 6,
        maxLength: 6
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);