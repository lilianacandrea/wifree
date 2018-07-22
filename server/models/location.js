const mongoose = require('mongoose');

var LocationModel = mongoose.model('Location', {
  locationName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  address: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  }
});

module.exports = {LocationModel};
