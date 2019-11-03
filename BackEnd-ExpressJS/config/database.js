const mongoose = require('mongoose');

// local mongodb
const connectionUrl = 'mongodb://127.0.0.1:27017/React-Course-Project';

// mongodb Atlas cluster
// const connectionUrl = 'mongodb+srv://user1:pass1@cluster0-fiivc.mongodb.net/test?retryWrites=true&w=majority';

mongoose.pluralize(null);

module.exports = mongoose.connect(connectionUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
