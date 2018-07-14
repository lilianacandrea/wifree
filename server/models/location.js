const mongoose = require('mongoose');

var LocationSchema = mongoose.model('Location', {
  locationName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    require: true
  }
});

var newLocation = new LocationSchema({
  locationName: 'mitzi@coadademaimuta.com',
  address: 'mitzi@coadademaimuta.com',
});
newLocation.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
  console.log('Unable to save location', err);
});

// var LocationAddress = mongoose.model('Location', LocationSchema);
module.exports = {LocationSchema};
