const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  // if there is no jwt in cookies or is invalid, send error status code and message
  jwt.verify(token, jwtSecret, (err, data) => {
    if (err) {
      res.status(401).send({'error': 'user must be logged in to do that'});
    } else {
      next();
    }
  });
};
