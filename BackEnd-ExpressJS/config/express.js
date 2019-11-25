// const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const ifLoggedAddUserToReq = require('../middlewares/ifLoggedAddUserToReq');

module.exports = (app) => {

  // Setup the body parser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Register 'cookie-parser' middleware
  app.use(cookieParser());

  // Register middleware for 'log in' check
  app.use(ifLoggedAddUserToReq);
  
  // Register middleware to enable CORS requests
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

};
