const request = require('supertest');
const expect = require('expect');

var app = require('../app');


/** TESTING THE FOLLOWING ROUTES 
 
router.get('/createinvitelist', InviteListController.createInviteListHome);
router.get('/lastinvitelist', InviteListController.getLastInviteList);
router.get('/listwizard', InviteListController.renderListWizard);
router.get('/listwizard/:groupCategory/:groupName', InviteListController.getPeopleByGroup);
router.get('/distributionlistmembers', InviteListController.getDistributionListMembers);
router.post('/postinvitelist', InviteListController.postInviteList);
router.post('/postinvitee', InviteListController.postInvitee);
router.post('/distributionlist', InviteListController.postDistributionList);
router.post('/distributionlistmembers', InviteListController.postDistributionListMembers);
router.delete('/distributionlist', InviteListController.truncateDistributionList);
router.delete('/distributionlistmembers', InviteListController.truncateDistributionListMembers);


*/

describe('GET /createinvitelist', function () {
    it('Should render invite list creator.', function (done) {
        request(app)
            .get('/createinvitelist/')
            .expect(302)
            .end(done);
    });
});

describe('GET /lastinvitelist', function () {
    it('Should get last created invite list from DB.', function (done) {
        request(app)
            .get('/lastinvitelist/')
            .expect(200)
            .end(done);
    });
});

describe('GET /listwizard', function () {
    it('Should render the list wizard.', function (done) {
        request(app)
            .get('/listwizard/')
            .expect(302)
            .end(done);
    });
});

describe('GET /:groupCategory/:groupName', function () {
    it('Should get a group of people.', function (done) {
        request(app)
            .get('/listwizard/Department/Engineering/')
            .expect(200)
            .end(done);
    });
});

describe('GET /distributionlistmembers', function () {
    it('Should get all fields in the distribution_list_members table.', function (done) {
        request(app)
            .get('/distributionlistmembers')
            .expect(200)
            .end(done);
    });
});


describe('POST /postinvitelist', function () {
    it('Should add a field to the invitelist table ', function (done) {
        const json = {
            "ListName": 'Unit Test',
            "ListComments": 'From the unit test'
        };
        request(app)
            .post('/postinvitelist')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(json)
            .expect(200)
            .expect((res) => {
                expect(JSON.stringify(res.body)).toEqual(expect.not.stringContaining('"affectedRows": 0'));
            })
            .end(done);
    });
});

describe('POST /postinvitee', function () {
    it('Should add a field to the invitelist table ', function (done) {
        const json = {
            'InvitationListID': 'TEST111',
            'BadgeNumber': '1234',
            'LastName': 'Pocket',
            'FirstName': 'Ara',
            'EmailAddress': 'pocketara@gmail.com'
        };
        request(app)
            .post('/postinvitee')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(json)
            .expect(200)
            .end(done);
    });
});



