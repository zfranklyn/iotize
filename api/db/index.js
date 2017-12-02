/*
  username: yhack2017,
  password: yhack2017yhack2017,
  mongodb://yhack2017:yhack2017yhack2017@ds125906.mlab.com:25906/yhack2017
*/

const mongoose = require('mongoose');

mongoose.connect('mongodb://jose:jose@ds125906.mlab.com:25906/yhack2017', { useMongoClient: true });
mongoose.Promise = global.Promise;
// connects to MLab database


const db = mongoose.connection;


module.exports = db;