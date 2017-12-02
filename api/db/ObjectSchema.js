// Defines our user schema, exports a User model object

const mongoose = require('mongoose');

const objectSchema = mongoose.Schema({
    id: Number,
    text: String,
    description: String,
    owner: String,
    creator: String,
})

const ObjectSchema = mongoose.model('yhack2017', objectSchema);

module.exports = ObjectSchema;