const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dq2snomti',
  api_key: '295496821319282',
  api_secret: 'yMySt87fZXDvK8zdVWdsQJg01iE',
});

module.exports = cloudinary;
