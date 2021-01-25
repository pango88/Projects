const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minglength: 5,
  },
  phone: {
    type: String,
    minglength: 5,
  },
  street: {
    type: String,
    required: true,
    minglength: 5,
  },
  city: {
    type: String,
    required: true,
    minglength: 3,
  },
  friendOf: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Person', schema);
