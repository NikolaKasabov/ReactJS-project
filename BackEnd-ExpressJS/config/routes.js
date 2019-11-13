const guestController = require('../controllers/guestController');
const userController = require('../controllers/userController');

const sendErrorIfNotLogged = require('../middlewares/sendErrorIfNotLogged');

module.exports = (app) => {
  
  app.get('/products/:category', guestController.productsGet);

  app.post('/register', guestController.registerPost);

  app.post('/login', guestController.loginPost);

  app.post('/addProductToCart/:productId', sendErrorIfNotLogged, userController.addProductToCartPost);

  // app.get('/logout', redirectIfNotLogged, userController.logoutGet);

  app.all('*', (req, res) => res.status('404').send({ 'error': '404. Not found.' }));
};
