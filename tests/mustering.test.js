
const request = require('supertest');
const expect = require('expect');

var app = require('../app');




/** TESTING THE FOLLOWING ROUTES 
 
router.get('/musterLive/:musterID', mustering.musterLive);
router.post('/musterLive/:musterID', mustering.emailUnaccounted);

*/

describe('GET /musterLive/127', function () {
    it('Should render muster live page.', function (done) {
        request(app)
            .get('/musterLive/127')
            .expect(302)
            .end(done);
    });
});

describe('POST /musterLive/127', function () {
    it('Should email unaccounted.', function (done) {
        request(app)
            .post('/musterLive/127')
            .expect(302)
            .end(done);
    });
});
