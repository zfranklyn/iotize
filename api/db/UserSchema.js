// Defines our user schema, exports a User model object

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    email: String,
    tel: String,
    metadata: Object,
})



module.exports = mongoose.model('users', userSchema);