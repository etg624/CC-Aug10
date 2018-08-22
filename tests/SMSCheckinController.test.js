const request = require('supertest');
const expect = require('expect');

var app = require('../app');


/** TESTING THE FOLLOWING ROUTES 
 
router.post('/smscheckin', SMSCheckInController.handleIncoming);
router.post('/sendsmsalert', SMSCheckInController.sendAlerts);


*/




describe('POST /smscheckin', function () {
	it('Should check someone in.', function (done) {
		var json = {
			From: '+18187317683',
			Body: '127'
		};
		request(app)
			.post('/smscheckin')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send(json)
			.expect(200)
			.end(done);
	});
	it('Should not crash when given an invalid event.', function (done) {
		var json = {
			From: '+18187317683',
			Body: 'bbb'
		};
		request(app)
			.post('/smscheckin')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send(json)
			.expect(200)
			.end(done);
	});
});

describe('POST /sendsmsalert', function () {
	it('Should send an sms alert.', function (done) {
		var json = {
			MusterID: '126'
		};
		request(app)
			.post('/sendsmsalert')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send(json)
			.expect(200)
			.end(done);
	});
});




//                                SAVING THIS FOR NOW

// describe('POST /smscheckin', function() {
// 	it('Testing handleIncoming!', function(done) {
// 	  var json = {
// 	  	From: '+18187317683',
// 	  	Body: '127'
// 	  };
// 	  request(app)
// 	    .post('/smscheckin')
// 	    .set('Accept', 'application/json')
// 	    .set('Content-Type', 'application/json')
//       .send(json)
//       .expect(200)
//       .expect((res) => {
//         expect(JSON.stringify(res.body)).toMatch('You have been checked in.');
//       })
//       .end(done);
// 	});
// });

