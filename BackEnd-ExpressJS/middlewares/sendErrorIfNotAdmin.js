module.exports = (req, res, next) => {
  const { username } = req.userData;

  if (username !== 'admin') {
    res.status(401).send({ 'error': 'Only the Administrator can do that.' });
  } else {
    next();
  }
};