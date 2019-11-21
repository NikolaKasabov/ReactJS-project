const guestController = require('../controllers/guestController');
const userController = require('../controllers/userController');

const sendErrorIfNotLogged = require('../middlewares/sendErrorIfNotLogged');

module.exports = (app) => {
  
  app.get('/products/:category', guestController.productsGet);

  app.post('/search', guestController.searchPost);

  app.post('/register', guestController.registerPost);

  app.post('/login', guestController.loginPost);

  app.post('/addProductToCart/:productId', sendErrorIfNotLogged, userController.addProductToCartPost);

  app.post('/removeProductFromCart/:productId', sendErrorIfNotLogged, userController.removeProductFromCartPost);

  app.get('/seeShoppingCart', sendErrorIfNotLogged, userController.seeShoppingCartGet);

  app.post('/addNewProduct', sendErrorIfNotLogged, userController.addNewProduct);

  app.all('*', (req, res) => res.status('404').send({ 'error': '404. Not found.' }));
};
