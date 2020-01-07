const NumberOfProductsModel = require('../models/NumberOfProducts');

function increaseOrDecreaseProductsNumber(category, value) {
  NumberOfProductsModel.updateOne({}, {
    $inc: { [category]: value, 'all': value }
  }).then(() => console.log('products number changed successfully'))
    .catch((err) => console.log(err));
}

module.exports = increaseOrDecreaseProductsNumber;
