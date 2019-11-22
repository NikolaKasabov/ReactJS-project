// const env = process.env.NODE_ENV || 'development';
const env = 'development';

const app = require('express')();
const config = require('./config/config')[env];
const connection = require('./config/database');

const bcrypt = require('bcryptjs');
const { saltRounds } = require('./config/config');
const UserModel = require('./models/User');

require('./config/express')(app);
require('./config/routes')(app);

connection.then(() => {

  // create administrator account, if it's not already created
  UserModel.findOne({ 'username': 'admin' })
    .then((adminAccount) => {
      if (!adminAccount) {
        bcrypt.genSalt(saltRounds)
          .then((salt) => bcrypt.hash('admin', salt))
          .then((hashedPass) => UserModel.create({
            username: 'admin',
            password: hashedPass,
          })).catch((err) => console.log(err));
      }
    }).then(() => {
      // start the server
      app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
    }).catch((err) => console.log(err));
}).catch((err) => console.log(err));
