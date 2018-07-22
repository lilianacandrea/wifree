const mongoose = require('mongoose');

var Network = mongoose.model('Network',{
  connection: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  lastUpdated: {
    type: Date,
    default: null
  }
});

module.exports = {Network};
