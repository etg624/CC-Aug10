const request = require('supertest');
const expect = require('expect');

var app = require('../app');

/** TESTING THE FOLLOWING ROUTES 
 
router.get('/users', users.usersHome);
router.get('/userAdd', users.userAdd);
router.get('/userModify/:userName', users.userGetOne);
router.get('/userDelete/:userName', users.userGetOneForDelete);
router.post('/userAdd', users.userAddToDb);
router.post('/userModify/:userName', users.userUpdateOne);
router.post('/userDelete/:userName', users.userDeleteOne);

*/

describe('GET /users', function () {
    it('Should render users view.', function (done) {
        request(app)
            .get('/users/')
            .expect(302)
            .end(done);
    });
});

describe('GET /userAdd', function () {
    it('Should render add users view.', function (done) {
        request(app)
            .get('/userAdd')
            .expect(302)
            .end(done);
    });
});

describe('GET /userModify/:username', function () {
    it('Should render add users view.', function (done) {
        request(app)
            .get('/userModify/mjackson')
            .expect(302)
            .end(done);
    });
});

describe('GET /userDelete/:username', function () {
    it('Should render add users view.', function (done) {
        request(app)
            .get('/userDelete/mjackson')
            .expect(302)
            .end(done);
    });
});

describe('POST /userAdd', function () {
    it('Should add a person to the people table', function (done) {

        const json = {
            userName: 'unittest',
            password: 'password',
            lastName: 'Test',
            firstName: 'Unit',
            empID: '123',
            userEmail: 'arakazaryan@me.com'
        };
        request(app)
            .post('/userAdd')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(json)
            .expect(302)
            .end(done);
    });
});

describe('POST /userModify/:userName', function () {
    it('Should modify a person in the people table', function (done) {

        const json = {
            userName: 'mjackson',
            password: 'password',
            lastName: 'Jackson',
            firstName: 'Michael',
            empID: '777',
            userEmail: 'arakazaryan@me.com'
        };
        request(app)
            .post('/userModify/mjackson')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(json)
            .expect(302)
            .end(done);
    });
});

describe('POST /userDelete/unittest', function () {
    it('Should delete a person from the people table', function (done) {

        request(app)
            .post('/userDelete/unittest')
            .expect(302)
            .end(done);
    });
});



