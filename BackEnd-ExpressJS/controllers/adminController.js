const myCloudinary = require('../config/cloudinaryConfig');
const ProductModel = require('../models/Product.js');

module.exports = {
  addNewProductToDbPost: (req, res) => {
    const { description, imageUrl, price, category } = req.body;
    // uploaded file path; added by 'multer'
    const filePath = req.file.path;

    // check if selected file is an image. send error if it's not an image.
    const fileType = req.file.mimetype.split('/')[0];
    if (fileType !== 'image') {
      res.send({ 'error': 'selected file is not an image' });
      return;
    }

    // upload provided image file to Cloudinary
    myCloudinary.uploader.upload(filePath, {
      folder: 'softuni-reactjs-project',  // wich folder in Cloudinary to use
      use_filename: true,  // don't change the filename before uploading the file
      unique_filename: false,  // don't append unique string to the end of the filename
    }).then((result) => {
      const imageUrl = result.secure_url;

      // add newly created product to MongoDB
      ProductModel.create({
        description,
        imageUrl,
        price: Number(price),
        category
      }).then(() => res.send({ 'message': 'product added successfully' }))
        .catch((err) => res.send({ 'error': err.toString() }));
      
    }).catch((err) => console.log(err));
  },

  deleteProductFromDbPost: (req, res) => {
    const { productId } = req.params;
    const { username } = req.userData;

    if (username !== 'admin') {
      res.send({ 'error': 'only the Administrator can delete products' });
    } else {
      ProductModel.findByIdAndDelete(productId)
        .then(() => res.send({ 'message': 'product successfully deleted' }))
        .catch(() => res.send({ 'error': 'something went wrong' }));
    }
  },
};
