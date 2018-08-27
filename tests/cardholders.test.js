const request = require('supertest');
const expect = require('expect');

var app = require('../app');

/** TESTING THE FOLLOWING ROUTES 
 
router.get('/cardholders', cardholders.cardholdersHome);

*/

describe('GET /cardholders', function () {
    it('Should render cardholders view.', function (done) {
        request(app)
            .get('/cardholders')
            .expect(302)
            .end(done);
    });
});