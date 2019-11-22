// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');
const ProductModel = require('../models/Product');
const { saltRounds, jwtSecret } = require('../config/config');

module.exports = {
  productsGet: (req, res) => {
    const { category } = req.params;

    ProductModel.find({ category })
      .then((products) => res.json(products))
      .catch((err) => console.log(err));
  },

  searchPost: (req, res) => {
    const { searchString } = req.body;

    ProductModel.find({ 'description': { $regex: new RegExp(searchString, 'i') } })
      .then((products) => res.json(products))
      .catch((err) => console.log(err));
  },

  registerPost: (req, res) => {
    const { username, password, repeatPassword } = req.body;

    // some checks
    // check if username is already taken
    UserModel.findOne({ 'username': username })
      .then((user) => {
        if (user) {
          res.status(400).send({ 'error': 'This username is already taken. Choose another.' });
        } else if (username.length < 5 || password.length < 5) {
          res.status(400).send({ 'error': 'The username and the password must be at least 5 characters long.' });
        } else if (password !== repeatPassword) {
          res.status(400).send({ 'error': 'Password and repeat password must match.' });
        } else {
          // hash the password
          bcrypt.genSalt(saltRounds)
            .then((salt) => {
              // pass the 'salt' and the 'hashed password' to the next .then() with Promise.all()
              return Promise.all([salt, bcrypt.hash(password, salt)]);
            })
            .then(([salt, hashedPass]) => {
              // add the new user to mongodb collection 'Users'
              return UserModel.create({ username, password: hashedPass });
            })
            .then(() => res.send({ 'message': 'Registration successful.' }))
            .catch((err) => res.status(400).send({ 'error': 'Registration not successful.' }));
        }
      })
  },

  loginPost: (req, res) => {
    const { username, password } = req.body;

    // check if username exists in 'Users' collection
    UserModel.findOne({ username })
      .then((userData) => {
        // if username is invalid
        if (!userData) {
          res.status(401).send({ 'error': 'Invalid username and/or password.' });
          return;
        }

        // check if password is valid
        bcrypt.compare(password, userData.password)
          .then((isPassValid) => {
            // if password is invalid
            if (!isPassValid) {
              res.status(401).send({ 'error': 'Invalid username and/or password.' });
              return;
            }

            // create jwt and save it in a cookie
            const token = jwt.sign({
              userId: userData._id,
              username: userData.username,
            }, jwtSecret);
            res.cookie('jwt', token)
              .cookie('username', userData.username)
              .send({ 'message': 'cookie sent' });
          }).catch((err) => console.log(err));
      }).catch((err) => console.log(err));
  },
};
