// Defines our user schema, exports a User model object

const mongoose = require('mongoose');

const ObjectSchema = mongoose.Schema({
    id: Number,
    text: String,
    description: String,
    owner: String,
    creator: String,
})

const Object = mongoose.model('yhack2017', ObjectSchema);

module.exports = Object;