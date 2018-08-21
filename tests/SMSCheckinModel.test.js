const request = require('supertest');
const expect = require('expect');

var app = require('../app');

describe('POST /smscheckin', function() {
	it('Testing handleIncoming!', function(done) {
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
      .expect((res) => {
        expect(JSON.stringify(res.body)).toMatch('You have been checked in.');
      })
      .end(done);
	});
});

