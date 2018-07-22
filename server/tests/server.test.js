const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {LocationAddress} = require('./../models/location');

const locations = [{
  _id: new ObjectID,
  locationName:  'Booha',
  address: 'Strada Pupazei'
}, {
  _id: new ObjectID,
  locationName:  'Bistro',
  address: 'Strada Paunului'
}];

beforeEach((done) => {
  LocationAddress.remove({}).then(() => {
    return LocationAddress.insertMany(locations);
  }).then(() => done());
});

describe('POST /locations', () => {
  // it('should create a new location', (done) => {
  //   var location = 'Booha';
  //   var address = 'Strada Pupazei';
  //
  //   request(app)
  //     .post('/locations')
  //     .send({location, address} )
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body.locationName).toBe(location);
  //       expect(res.body.address).toBe(address);
  //     })
  //     .end((err, res) => {
  //       if(err) {
  //         return done(err);
  //       }
  //
  //       LocationAddress.find().then((locations) => {
  //         expect(locations[0].locationName).toBe(location);
   //        expect(locations[1].address).toBe(address);
  //         done();
  //       }).catch((e) => done(e));
  //     });
  // });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/locations')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        LocationAddress.find().then((locations) => {
          expect(locations.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /locations', () => {
  it('should get all locations ', (done) => {
    request(app)
      .get('/locations')
      .expect(200)
      .expect((res) => {
        expect(res.body.locations.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /locations/:id', () => {
  it('should return location doc', (done) => {
    request(app)
      .get(`/locations/${locations[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.location.locationName).toBe(locations[0].locationName);
        expect(res.body.location.address).toBe(locations[0].address);
      })
      .end(done);
  });

  it('should return 404 if location not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/locations/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/locations/123abc')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /locations/:id', () => {
  it('should update the location', (done) => {
    var hexId = locations[0]._id.toHexString();
    var locationName = 'locationn';
    var address = 'addresss';

    request(app)
      .patch(`/locations/${hexId}`)
      .send({
        locationName,
        address
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.location.locationName).toBe(locationName);
        expect(res.body.location.address).toBe(address);
      })
      .end(done);
  });
});
