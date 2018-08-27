

const request = require('supertest');
const expect = require('expect');

var app = require('../app');


/** TESTING THE FOLLOWING ROUTES 
 
router.get('/badges', badges.badgesHome);
router.get('/badgesActive', badges.badgesActive);
router.get('/badgesInactive', badges.badgesInactive);
router.get('/badgeDetail/:badgeID', badges.badgesGetOne);


*/

describe('GET /badges', function () {
    it('Should render badges view.', function (done) {
        request(app)
            .get('/badges')
            .expect(302)
            .end(done);
    });
});

describe('GET /badgesActive', function () {
    it('Should render badges active view.', function (done) {
        request(app)
            .get('/badgesActive')
            .expect(302)
            .end(done);
    });
});

describe('GET /badgesInactive', function () {
    it('Should render badges active view.', function (done) {
        request(app)
            .get('/badgesInactive')
            .expect(302)
            .end(done);
    });
});

describe('GET /badgeDetail/:badgeID', function () {
    it('Should render badge detail view.', function (done) {
        request(app)
            .get('/badgeDetail/514')
            .expect(302)
            .end(done);
    });
});

