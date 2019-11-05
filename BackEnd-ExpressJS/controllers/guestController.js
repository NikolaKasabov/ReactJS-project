const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');
const ProductModel = require('../models/Product');
const { saltRounds, jwtSecret } = require('../config/config');

module.exports = {
  productsGet: (req, res) => {
    const { category } = req.params;

    ProductModel.find({ category })
      .then((products) => {
        res.json(products);
      })
      .catch((err) => console.log(err));
  },

  registerPost: (req, res) => {
    const { username, password, repeatPassword } = req.body;

    // hash the password
    bcrypt.genSalt(saltRounds)
      .then((salt) => {
        // pass the 'salt' and the 'hashed password' to the next .then() with Promise.all()
        return Promise.all([salt, bcrypt.hash(password, salt)]);
      })
      .then(([salt, hashedPass]) => {
        // add the new user to mongodb collection 'Users'
        return UserModel.create({ username, password: hashedPass, salt });
      })
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err));
  },

  loginPost: (req, res) => {
    const { username, password } = req.body;

    // check if username exists in 'Users' collection
    UserModel.findOne({ username })
      .then((userData) => {
        // if username is invalid
        if (!userData) {
          res.status('401')
            .send('Invalid data.');
        }

        // check if password is valid
        bcrypt.compare(password, userData.password)
          .then((isPassValid) => {
            // if password is invalid
            if (!isPassValid) {
              res.status('401')
                .send('Invalid data.');
            }

            // create jwt and save it in a cookie
            const token = jwt.sign({
              userId: userData._id,
              username: userData.username,
            }, jwtSecret);
            res.cookie('jwt', token)
              .cookie('username', userData.username)
              .send('cookie sent');
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
};
