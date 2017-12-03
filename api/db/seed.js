const db = require('./index.js');
const UserModel = require('./UserSchema');
const ObjectModel = require('./ObjectSchema');
const data = require('./data');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log("Connected to database");
    const length = data.length;
    for (let n = 0; n < length; n++) {
      let obj = data[n];
      const { name, details, actions } = obj;
      await ObjectModel.create({
        name, details, actions
      })
      .then(console.log)
      .catch(console.log);
    }
});

