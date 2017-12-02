/*
  username: yhack2017,
  password: yhack2017yhack2017,
  mongodb://yhack2017:yhack2017yhack2017@ds125906.mlab.com:25906/yhack2017
*/

const mongoose = require('mongoose');

// connects to MLab database
mongoose.connect('mongodb://yhack2017:yhack2017yhack2017@ds125906.mlab.com:25906/yhack2017');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected to database")
});
