const guestController = require('../controllers/guestController');
const userController = require('../controllers/userController');

const redirectIfNotLogged = require('../middlewares/redirectIfNotLogged');

module.exports = (app) => {
  
  app.get('/products/:category', guestController.productsGet);

  app.post('/register', guestController.registerPost);

  app.post('/login', guestController.loginPost);

  app.post('/addProductToCart/:productId', userController.addProductToCartPost);

  // app.get('/logout', redirectIfNotLogged, userController.logoutGet);

  app.all('*', (req, res) => res.json({ error: '404' }));
};
