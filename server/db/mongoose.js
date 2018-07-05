var mongoose = require('mongoose');

 //connect to database
 mongoose.Promise = global.Promise;
 mongoose.connect(process.env.MONGODB_URI);

 module.exports = {mongoose};
