const jwt = require('jsonwebtoken');
const CourseModel = require('../models/Product');
const UserModel = require('../models/User');
const showNotification = require('../utils/showNotification');
const redirectIfNotLogged = require('../middlewares/redirectIfNotLogged');

const { jwtSecret } = require('../config/config');

module.exports = {
  addProductToCartPost: (req, res) => {
    const { productId } = req.params;
    const { userId } = req.userData;

    UserModel.findByIdAndUpdate(userId,
      { $push: { 'shoppingCart': productId } }
    )
      .then((result) => console.log(result))
      .catch((err) => console.log(err));    
  },

  // logoutGet: (req, res) => {
  //   res.clearCookie('jwt');
  //   res.redirect('/');
  // },
}