const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const { jwtSecret } = require('../config/config');

module.exports = {
  addProductToCartPost: (req, res) => {
    const { productId } = req.params;
    const { userId } = req.userData;

    UserModel.findByIdAndUpdate(userId,
      { $push: { 'shoppingCart': productId } }
    )
      .then(() => res.send({'message': 'Product successfully added to the shopping cart.'}))
      .catch((err) => console.log(err));    
  },

  // logoutGet: (req, res) => {
  //   res.clearCookie('jwt');
  //   res.redirect('/');
  // },
}