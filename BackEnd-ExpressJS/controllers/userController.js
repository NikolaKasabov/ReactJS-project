// const jwt = require('jsonwebtoken');
const uuid = require('uuid/v1');
const UserModel = require('../models/User');
const ProductModel = require('../models/Product.js');

// const { jwtSecret } = require('../config/config');

module.exports = {
  addProductToCartPost: (req, res) => {
    const { productId } = req.params;
    const { userId } = req.userData;

    // add the whole product object to the shopping cart with newly generated id(with uuid)
    ProductModel.findById(productId)
      .then((product) => {
        const productToAddToCart = {
          id: uuid(),
          imageUrl: product.imageUrl,
          description: product.description,
          price: product.price,
        };

        UserModel.findByIdAndUpdate(userId,
          { $push: { 'shoppingCart': productToAddToCart } }
        ).then(() => res.send({ 'message': 'Product successfully added to the shopping cart.' }))
          .catch((err) => console.log(err));
        
      }).catch((err) => console.log(err));
  },

  removeProductFromCartPost: (req, res) => {
    const { productId } = req.params;
    const { userId } = req.userData;

    UserModel.findByIdAndUpdate(userId,
      { $pull: { 'shoppingCart': {'id': productId} } }
    ).then(() => res.send({ 'message': 'Product successfully removed from the shopping cart.' }))
      .catch((err) => console.log(err));
  },

  seeShoppingCartGet: (req, res) => {
    const { userId } = req.userData;

    UserModel.findById(userId)
      .then((user) => res.json(user.shoppingCart))
      .catch((err) => console.log(err));
  },
}