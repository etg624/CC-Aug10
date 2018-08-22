const request = require('supertest');
const expect = require('expect');

var app = require('../app');


/** TESTING THE FOLLOWING ROUTES 
 
router.get('/microsoftgraph', MicrosoftGraphController.getPeople);
router.post('/microsoftgraph', MicrosoftGraphController.addPerson);


*/

describe('GET /microsoftgraph', function () {
    it('Should return people.', function (done) {
        request(app)
            .get('/microsoftgraph/')
            .expect(200)
            .end(done);
    });
});


describe('POST /microsoftgraph', function () {
    it('Should add a person to the people table', function (done) {
        const json = {
            'FirstName': 'Ara',
            'LastName': 'Pocket',
            'Phone': '+18187317683'
        };
        request(app)
            .post('/microsoftgraph')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(json)
            .expect(200)
            .expect((res) => {
                expect(JSON.stringify(res.body)).toEqual(expect.not.stringContaining('undefined'));
            })            
            .end(done);
    });
});



