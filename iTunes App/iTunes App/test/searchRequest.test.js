const expect = require('chai').expect;
const request = require('request');

describe('Testing search endpoint', function() {
   it('result', function(done) {
      request('http://localhost:3000/searchTest',
         function(error, response, body) {
            // We use a timeout because the test's default timeout is 2 seconds which does not give the API enough time to respond to the request and as a result, we then extend it to 10 seconds
            this.timeout = 10000;
            expect(response).not.to.be.undefined;
            done();
         })
   })
})