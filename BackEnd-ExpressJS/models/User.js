const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Username must be at least 5 characters long.'],
    validate: {
      validator: function (v) {
        return /[a-zA-Z0-9]+/.test(v);
      },
      message: () => 'Username should consist only English letters and digits.',
    },
  },

  password: {
    type: String,
    required: true,
    minlength: [5, 'Password must be at least 5 characters long.'],
    validate: {
      validator: function (v) {
        return /[a-zA-Z0-9]+/.test(v);
      },
      message: () => 'Password should consist only English letters and digits.',
    },
  },

  // shoppingCart: [{ type: mongoose.Types.ObjectId, ref: 'Products' }],
  shoppingCart: [{ type: Object }],
});

module.exports = mongoose.model('Users', userSchema);
