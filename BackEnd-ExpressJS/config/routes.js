const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// const storage = multer.memoryStorage();  // not saving the image to the hard disk
// const multerUploads = multer({ storage }).single('imageFile');

const guestController = require('../controllers/guestController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');

const sendErrorIfNotLogged = require('../middlewares/sendErrorIfNotLogged');
const sendErrorIfNotAdmin = require('../middlewares/sendErrorIfNotAdmin');

module.exports = (app) => {

  app.get('/products/:category', guestController.productsGet);

  app.post('/search', guestController.searchPost);

  app.post('/register', guestController.registerPost);

  app.post('/login', guestController.loginPost);

  app.post('/addProductToCart/:productId', sendErrorIfNotLogged, userController.addProductToCartPost);

  app.post('/removeProductFromCart/:productId', sendErrorIfNotLogged, userController.removeProductFromCartPost);

  app.get('/shoppingCart', sendErrorIfNotLogged, userController.shoppingCartGet);

  app.get('/checkout', sendErrorIfNotLogged, userController.checkoutGet);

  app.post('/addNewProductToDb', sendErrorIfNotLogged, sendErrorIfNotAdmin,
    upload.single('imageFile'),
    // multerUploads,
    adminController.addNewProductToDbPost);

  app.post('/deleteProductFromDb/:productId', sendErrorIfNotLogged, sendErrorIfNotAdmin, adminController.deleteProductFromDbPost);

  app.all('*', (req, res) => res.status('404').send({ 'error': '404. Not found.' }));
};
