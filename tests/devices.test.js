const request = require('supertest');
const expect = require('expect');

var app = require('../app');

/** TESTING THE FOLLOWING ROUTES 
 
router.get('/devices', devices.devicesHome);
router.get('/deviceModify/:authCode', devices.deviceGetOne);
router.get('/deviceHistory/:authCode', devices.deviceGetHistory);
router.post('/deviceModify/:authCode', devices.deviceUpdateOne);


*/

describe('GET /devices', function () {
    it('Should render devices view.', function (done) {
        request(app)
            .get('/devices')
            .expect(302)
            .end(done);
    });
});

describe('GET /deviceModify/:authCode', function () {
    it('Should render device modify view.', function (done) {
        request(app)
            .get('/deviceModify/123456789012347')
            .expect(302)
            .end(done);
    });
});

// describe('POST /deviceModify/:authCode', function () {
//     it('Should update a device information.', function (done) {
//         request(app)
//             .post('/deviceModify/123456789012347')
//             .expect(200)
//             .end(done);
//     });
// });