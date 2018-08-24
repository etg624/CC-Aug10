const request = require('supertest');
const expect = require('expect');

var app = require('../app');


/** TESTING THE FOLLOWING ROUTES 
 
router.get('/linkcheckin/:email/:eventid', EmailController.checkInByLink);
router.post('/emailcheckin', EmailController.checkInByEmail);

*/

describe('GET /linkcheckin/:email/:eventid', function () {
    it('Should check in someone by email.', function (done) {
        request(app)
            .get('/linkcheckin/pocketara@gmail.com/127')
            .expect(200)
            .expect((res) => {
                expect(JSON.stringify(res.body)).toMatch('You have checked in.');
            })
            .end(done);
    });
});

describe('POST /emailcheckin', function () {
    it('Should check in by email. ', function (done) {
        const json = {
            FirstName: 'Email',
            LastName: 'Test',
            subject: '127',
            EventName: 'uhhh',
            iClassNumber: '99999',
            CheckInType: 4,
            sender: 'pocketara@gmail.com'
        };
        request(app)
            .post('/emailcheckin')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(json)
            .expect(200)
            .expect((res) => {
                expect(JSON.stringify(res.body)).toMatch('You have checked in.');
            })
            .end(done);
    });
    it('Should check in as anonymous. ', function (done) {
        const json = {
            FirstName: 'Email',
            LastName: 'Test',
            subject: '127',
            EventName: 'uhhh',
            iClassNumber: '99999',
            CheckInType: 4,
            sender: 'fakeemail@fakeemail.com'
        };
        request(app)
            .post('/emailcheckin')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(json)
            .expect(200)
            .expect((res) => {
                expect(JSON.stringify(res.body)).toMatch('You have been checked in as anonymous.');
            })
            .end(done);
    });
    it('Should say that the event was not found. ', function (done) {
        const json = {
            FirstName: 'Email',
            LastName: 'Test',
            subject: 'nope',
            EventName: 'uhhh',
            iClassNumber: '99999',
            CheckInType: 4,
            sender: 'fakeemail@fakeemail.com'
        };
        request(app)
            .post('/emailcheckin')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(json)
            .expect(200)
            .expect((res) => {
                expect(JSON.stringify(res.body)).toMatch('No event was found');
            })
            .end(done);
    });
});


