/////////////// Testing framework ////////////////

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const sinonTest = require('sinon-test');
const test = sinonTest(sinon);
const faker = require("faker");

//////////////////////////////////////////////////

// Test CRUD operations in controller
const controller = require('../controller/index.js');
// Model
const { Ticker } = require('../db/index.js');

// To create valid sample request objects
// might not need this
const testData = require('./testdata.js');

// Create functions
describe('CRUD functions', function() {
  describe('Create', function() {
    // required on all tests: contains unchanged body and params
    var req = {
      params: {
        ticker: 'SMPL'
      },
      body: {
        ticker: 'SMPL',
        name: 'Sample Ticker',
        prices: [
          {
            dateTime: new Date("2019-11-16T22:27:19.319Z"),
            open: 264.03,
            high: 264.40,
            low: 264.02,
            close: 264.35,
            volume: 96770
          }
        ]
      }
    };
    var res = {};
    var expectedResult;
    beforeEach(() => {
      // stubbing the res.status and spying on res.json:
      // Question: how to stub chained res.status.send?
      // https://www.techighness.com/post/unit-testing-expressjs-controller-part-1/
      status = sinon.stub();
      status.returns({ send: sinon.spy() });
      res = {
        status
      };
    });
    describe('addTicker function', function() {
      it('should return created Ticker object and 201 success status', test(function() {
        expectedResult = req.body;
        // addTicker calls exists first, but we're testing for create so we'll
        // stub it to return false
        this.stub(Ticker, 'exists').yields(null, false);
        const stub = this.stub(Ticker, 'create').yields(null, expectedResult);
        controller.addTicker(req, res);
        sinon.assert.calledWith(Ticker.create, req.body);
        expect(status.calledOnce).to.be.true;
        sinon.assert.calledWith(res.status(201).send, sinon.match({ ticker: req.body.ticker }));
      }));
      it('Should return a 409 error and message when trying to add duplicates', test(function() {
        this.stub(Ticker, 'exists').yields(null, true);
        controller.addTicker(req, res);
        sinon.assert.calledWith(Ticker.exists, { ticker: req.params.ticker });
        expect(status.calledOnce).to.be.true;
        sinon.assert.calledWith(res.status(409).send, 'Ticker already exists');
      }));
      xit('should return 500 on server error', function() {
        // send a badly formed post
        // check get errors back
      });
    });
    describe('addCurrentPrice function', function() {
      it('Should return 404 for non-existing ticker', test( function() {
        req = {
          params: {
            ticker: 'NOTINDBS'
          },
          body: {}
        };
        this.stub(Ticker, 'findOne').yields(null, null);
        controller.addCurrentPrice(req, res);
        sinon.assert.calledWith(Ticker.findOne, { ticker: req.params.ticker });
        sinon.assert.calledWith(res.status(404).send, 'There is no ticker with that value');
      }));
      xit('Should add a new price to an existing ticker', test( function() {

      }));
    })
  })
  // Read
  describe('Read', function() {
    xit('should have a getTicker method that returns the prices for that Ticker', function() {


    });
    xit('should have a getCurrentPrice method that returns the last price for that Ticker', function() {

    });
    xit('should have a getPercentChange method that returns the percent change between the last available price and the price immediately before that', function() {

    });
    xit('should handle errors', function() {

    });
  });
});
