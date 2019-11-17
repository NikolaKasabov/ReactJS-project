const guestController = require('../controllers/guestController');
const userController = require('../controllers/userController');

const sendErrorIfNotLogged = require('../middlewares/sendErrorIfNotLogged');

module.exports = (app) => {
  
  app.get('/products/:category', guestController.productsGet);

  app.post('/register', guestController.registerPost);

  app.post('/login', guestController.loginPost);

  app.post('/addProductToCart/:productId', sendErrorIfNotLogged, userController.addProductToCartPost);

  app.post('/removeProductFromCart/:productId', sendErrorIfNotLogged, userController.removeProductFromCartPost);

  app.get('/seeShoppingCart', sendErrorIfNotLogged, userController.seeShoppingCartGet);

  app.all('*', (req, res) => res.status('404').send({ 'error': '404. Not found.' }));
};
