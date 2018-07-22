const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {LocationAddress} = require('./../models/location');

const locations = [{
  locationName:  'Booha',
  address: 'Strada Pupazei'
}, {
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
