/////////////// Testing framework ////////////////

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const faker = require("faker");

//////////////////////////////////////////////////

// Test CRUD operations in controller
const controller = require('../controller/index.js');
// Model
const { Ticker } = require('../db/index.js');

// To create valid sample request objects
// might not need this
const testData = require('./testdata.js');
const sampleTicker = require('../sampledata/price.js');

// Create functions
describe('Create', function() {
  let status, json, res;
  const req = {
    params: {
      ticker: 'Sample Ticker'
    },
    body: {
      ticker: 'Sample Ticker'
    }
  };
  beforeEach(() => {
    // stubbing the res.status and spying on res.json:
    // Question: how to stub chained res.status.send?
    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    status.returns(res);
  });

  it('should have an addTicker method that creates a document', async function() {
    const stubValue = {
      id: faker.random.uuid(),
      ticker: 'Sample Ticker',
      prices: []
    }
    const stub = sinon.stub(Ticker, "create").returns(stubValue);
    await controller.addTicker(req, res);
    expect(stub.calledOnce).to.be.true;
    expect(status.calledOnce).to.be.true;
    expect(status.args[0][0]).to.equal(201);
    expect(json.calledOnce).to.be.true;
    expect(json.args[0][0].data).to.equal(stubValue);
  });
  xit('addTicker method does not add duplicates', function() {
    // do addTicker(req, res)
    // do it again
    // second time should get back an error
  });
  xit('should handle errors', function() {
    // send a badly formed post
    // check get errors back
  });
});
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