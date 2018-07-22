require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {LocationModel} = require('./models/location');
const {Network} = require('./models/network');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/locations', (req, res) => {
  var location = new LocationModel({
    locationName: req.body.locationName,
    address: req.body.address
  });

  location.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


app.listen(port, () => {
  console.log(`Started up at port ${port}.`);
});

module.exports = {app};
