const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    address: String,
    age: Number, 
    tel: String,
    img: String
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;