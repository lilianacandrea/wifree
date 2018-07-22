require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {LocationAddress} = require('./models/location');
const {Network} = require('./models/network');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/locations', (req, res) => {
  var location = new LocationAddress({
    locationName: req.body.locationName,
    address: req.body.address
  });

  location.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/locations', (req, res) => {
  LocationAddress.find().then((locations) => {
    res.send({locations});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/locations/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  LocationAddress.findById(id).then((location) => {
    if (!location) {
      return res.status(404).send();
    }

    res.send({location});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}.`);
});

module.exports = {app};
