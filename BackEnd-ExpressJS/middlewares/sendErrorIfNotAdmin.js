module.exports = (req, res, next) => {
  const { username } = req.userData;

  if (username !== 'admin') {
    res.status(401).send({ 'error': 'only the administrator can do that' });
  } else {
    next();
  }
};