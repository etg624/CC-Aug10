const request = require('supertest');
const expect = require('expect');

var app = require('../app');

/** TESTING THE FOLLOWING ROUTES 
 
router.get('/connections', connections.connectionsHome);

*/

describe('GET /connections', function () {
    it('Should render connections view.', function (done) {
        request(app)
            .get('/connections')
            .expect(302)
            .end(done);
    });
});