// Defines our user schema, exports a User model object

const mongoose = require('mongoose');

const objectSchema = mongoose.Schema({
    name: String,
    details: {
        imageURLs: [],
        description: String,
        customAlert: String,
    },
    actions: {
        maintenance: {
            enabled: Boolean,
            statusBroken: Boolean,
            maintenanceMessage: String,
        },
        purchase: {
            enabled: Boolean,
        },
        custom: [],
    },
    comments: [],
})



module.exports = mongoose.model('objects', objectSchema);