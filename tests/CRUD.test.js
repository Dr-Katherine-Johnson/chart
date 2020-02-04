/////////////// Testing framework ////////////////

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const sinonTest = require('sinon-test');
const test = sinonTest(sinon);
const faker = require("faker");

// Cannot test using sinon-mongoose because: sinon-test@2.4.1 requires a peer of sinon@2.x - 7.x
// I'm on sinon@8.1.1

//////////////////////////////////////////////////

// Test CRUD operations in controller
const controller = require('../controller/index.js');
// Model
const { Ticker } = require('../db/index.js');

// Create functions
describe('CRUD functions', function() {
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
  describe('Create', function() {
    beforeEach(() => {
      // stubbing the res.status and spying on res.status.json, res.status.send, res.status.end:
      // Question: how to stub chained res.status.send?
      // https://www.techighness.com/post/unit-testing-expressjs-controller-part-1/
      status = sinon.stub();
      status.returns({ send: sinon.spy(), end: sinon.spy(), json: sinon.spy() });
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
  })
  // Read
  describe('Read', function() {
    // we'll have to save a sample ticker to the database so we can test the GET
    beforeEach(() => {
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
    })
    xit('should have a getTicker method that returns the prices for that Ticker', function() {
      // should return the closing price
    });
    xit('should have a getCurrentPrice method that returns the last price for that Ticker', function() {

    });
    xit('should have a getPercentChange method that returns the percent change between the last available price and the price immediately before that', function() {

    });
    xit('should handle errors', function() {

    });
  });
  // Update
  describe('Update', function() {
    describe('updateTicker function', function() {
      it('Should return 404 for non-existing ticker', test( function() {
        var badTicker = {
          params: {
            ticker: 'NOTINDBS'
          },
          body: {}
        };
        this.stub(Ticker, 'findOne').yields(null, null);
        controller.updateTicker(badTicker, res);
        sinon.assert.calledWith(Ticker.findOne, { ticker: badTicker.params.ticker });
        sinon.assert.calledWith(res.status(404).send, 'There is no ticker with that value');
      }));
      it('Should return status 500 on server error (finding ticker)', test( function() {
        var badReq = {
          params: {
            ticker: 'NOTINDBS'
          },
          body: {
            dateTime: new Date("2019-11-16T22:27:19.319Z"),
            open: 264.03,
            high: 264.40,
            low: 264.02,
            close: 264.35,
            volume: 96770
          }
        };
        const error = new Error({ error: "Some Error" });
        this.stub(Ticker, 'findOne').yields(error);
        controller.updateTicker(badReq, res);
        sinon.assert.calledOnce(Ticker.findOne);
        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledOnce(res.status(500).end);
      }));
      it('Should add a new price to an existing ticker', test( function() {
        // create a ticker
        controller.addTicker(req, res);
        // new price
        var newPriceReq = {
          params: {
            ticker: 'SMPL'
          },
          body: {
            dateTime: new Date(),
            open: 264.03,
            high: 264.40,
            low: 264.02,
            close: 264.35,
            volume: 96770
          }
        };
        req.body = {
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
        var existingTicker = req.body;
        expectedResult = {
          prices: [
            req.body,
            newPriceReq.body
          ]
        }
        this.stub(Ticker, 'findOne').yields(null, req.body);
        controller.updateTicker(newPriceReq, res);
        sinon.assert.calledWith(Ticker.findOne, { ticker: req.params.ticker });
        // !!!! FIX !!! Test not passing here when adding a new price object to prices array
        sinon.assert.calledWith(Ticker.findOneAndUpdate, req.params.ticker, { $addToSet: { prices: req.body } }, { new: true });
        sinon.assert.calledWith(res.json, sinon.match({ prices: expectedResult.prices }));
      }));
      xit('Should return status 403 with a message that it can\'t add an invalid current price', test( function() {
        // create a ticker
        controller.addTicker(req, res);
        // if the current price you're trying to add is before the last current price
        const lastDate = new Date("2019-11-16T22:27:19.319Z");
        const invalidNewDate = new Date(lastDate.getTime() - 1);
        var newInvalidDateReq = {
          params: {
            ticker: 'SMPL'
          },
          body: {
            dateTime: invalidNewDate,
          }
        }
        // you shouldn't be able to add it to the prices array
      }));
    })
  });
  // Delete
  describe('Delete', function() {
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
