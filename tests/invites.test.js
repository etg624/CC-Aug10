const request = require('supertest');
const expect = require('expect');

var app = require('../app');

/** TESTING THE FOLLOWING ROUTES 
 
router.get('/inviteLists', invites.inviteLists);
router.get('/inviteListsAdd/:eventID', invites.inviteListsAddforEvent);
router.get('/inviteListsChange/:eventID/:eventName/:invitationListID', invites.inviteListsChangeforEvent);
router.get('/inviteAdd', invites.inviteAdd);
router.post('/inviteAdd', invites.inviteIngest);
router.get('/invitees/:invitationListID', invites.invitees);


*/

describe('GET /inviteLists', function () {
    it('Should render invite lists view.', function (done) {
        request(app)
            .get('/inviteLists')
            .expect(302)
            .end(done);
    });
});

describe('GET /inviteListsAdd/:eventID', function () {
    it('Should render invite list add view.', function (done) {
        request(app)
            .get('/inviteListsAdd/127')
            .expect(302)
            .end(done);
    });
});

describe('GET /inviteListsChange/:eventID/:eventName/:invitationListID', function () {
    it('Should render invite list change view.', function (done) {
        request(app)
            .get('/inviteListsChange/127/someEvent/238')
            .expect(302)
            .end(done);
    });
});

describe('GET /inviteAdd', function () {
    it('Should render invite lists view.', function (done) {
        request(app)
            .get('/inviteAdd')
            .expect(302)
            .end(done);
    });
});

describe('GET /invitees/:invitationListID', function () {
    it('Should render invite lists view.', function (done) {
        request(app)
            .get('/invitees/238')
            .expect(302)
            .end(done);
    });
});

describe('POST /inviteAdd', function () {
    it('Should render a view.', function (done) {
        request(app)
            .get('/inviteAdd')
            .expect(302)
            .end(done);
    });
});
