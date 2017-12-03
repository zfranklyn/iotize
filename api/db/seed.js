const db = require('./index.js');
const UserModel = require('./UserSchema');
const ObjectModel = require('./ObjectSchema');
const data = require('./data');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected to database");
    data.map(obj => {
      const { name, details, actions } = obj;
      ObjectModel.create({
        name, details, actions
      })
      .then(console.log)
      .catch(console.log);
    })
});

