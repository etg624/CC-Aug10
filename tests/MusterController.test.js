const request = require('supertest');
const expect = require('expect');

var app = require('../app');




/** TESTING THE FOLLOWING ROUTES 
 
router.get('/musterAttendance/:id', MusterController.getAttendance);
router.get('/musterUnknowns/:id', MusterController.getUnknowns);
router.get('/musterInvalids/:id', MusterController.getInvalids);
router.get('/musterEvacuation', MusterController.getEvacuationList);
router.get('/musterGetPoints/:id', MusterController.getMusterPoints);


*/

describe('GET /musterAttendance/127', function () {
  it('Should return muster attendance.', function (done) {
    request(app)
      .get('/musterAttendance/127')
      .expect(200)
      .end(done);
  });
});

describe('GET /musterUnknowns/127', function () {
  it('Should return muster unknowns.', function (done) {
    request(app)
      .get('/musterUnknowns/127')
      .expect(200)
      .end(done);
  });
});

describe('GET /musterInvalids/127', function () {
  it('Should return muster invalids.', function (done) {
    request(app)
      .get('/musterInvalids/127')
      .expect(200)
      .end(done);
  });
});

describe('GET /musterGetPoints/127', function () {
  it('Should return muster points.', function (done) {
    request(app)
      .get('/musterGetPoints/127')
      .expect(200)
      .end(done);
  });
});

describe('GET /musterEvacuation', function () {
  it('Should return evacuation list.', function (done) {
    request(app)
      .get('/musterEvacuation')
      .expect(200)
      .end(done);
  });
});


