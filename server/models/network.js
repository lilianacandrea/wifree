const mongoose = require('mongoose');

var NetworkSchema = mongoose.model('Network',{
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
  // _creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // }
});

var newNetwork = new NetworkSchema({
  connection: 'mitzi@coadademaimuta.com',
  password: 'mitzi@coadademaimuta.com',
  lastUpdated: '12334333'
});
newNetwork.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
  console.log('Unable to save location', err);
});

// var Network = mongoose.model('Network', NetworkSchema);
module.exports = {NetworkSchema};
