// Test CRUD operations in controller
const controller = require('../controller/index.js');
// schema is in db.Ticker
const { Ticker } = require('../db/index.js');

//////// Testing framework //////////////
// To stub functions which query the database
const sinon = require('sinon')
// to test chained model methods
require('sinon-mongoose');
const chai, { expect } = require('chai');
// Sinon–Chai provides a set of custom assertions for using the Sinon.JS spy, stub, and mocking framework with the Chai assertion library.
const sinonChai = require('sinon-chai');
// Simple request and response mock objects to pass into Express routes when testing using Sinon.
const { mockReq, mockRes } = require('sinon-express-mock');
chai.use(sinonChai);
// To creaate valid request objects
const testData = require('./testdata.js');

describe('/price/:ticker', () => {
  it('should foo the bar', () => {
    const request = {
      body: {
        foo: 'bar',
      },
    }
    const req = mockReq(request)
    const res = mockRes()

    route(req, res)

    expect(res.json).to.be.calledWith({ foo: request.body.foo })
  })
})
// Create
describe('Create', function() {
  beforeEach(function() {
    sinon.stub(Ticker, 'find');
  });


  afterEach(function() {
      Meme.find.restore();
  });
  it('should have an addTicker method that creates a document', sinon.test(function() {

  }));
  it('addTicker method does not add duplicates', sinon.test(function() {

  }));
  it('should handle errors', sinon.test(function() {

  }));
});
// Read
describe('Read', function() {
  beforeEach(function() {
    sinon.stub(Ticker, 'find');
  });


  afterEach(function() {
      Ticker.find.restore();
  });
  it('should have a getTicker method that returns the prices for that Ticker', sinon.test(function() {

  }));
  it('should have a getCurrentPrice method that returns the last price for that Ticker', sinon.test(function() {

  }));
  it('should have a getPercentChange method that returns the percent change between the last available price and the price immediately before that', sinon.test(function() {

  }));
  it('should handle errors', sinon.test(function() {

  }));
});