const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {LocationModel} = require('./../models/location');

beforeEach((done) => {
  LocationModel.remove({}).then(() => done());
});

describe('POST /locations', () => {
  // it('should create a new location', (done) => {
  //   var location = 'Booha';
  //   var address = 'Strada Pupazei';
  //
  //   request(app)
  //     .post('/locations')
  //     .send({location}, {address} )
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
  //       LocationModel.find().then((locations) => {
  //         expect(locations.length).toBe(1);
  //         expect(locations[0].locationName).toBe(location);
  //         expect(locations[1].address).toBe(address);
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

        LocationModel.find().then((locations) => {
          expect(locations.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
