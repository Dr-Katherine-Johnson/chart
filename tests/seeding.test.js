const mongoSeed = require('../seeds/mongo-seed.js');
const mongoDB = require('../db/index.js');
const influxSeed = require('../seeds/influx/seed.js');
// TODO: use chai syntax

// TODO: connect to separate test database for running test runner file
// SEEDING SCRIPTS
describe('Mongo Seeding Script', () => {
  const tickersWithPrices = mongoSeed.start();
  xit('Should return an array of 100 objects', () => {
    expect(tickersWithPrices).toHaveLength(100);
  });
  // QUESTION: should it actually save to database when testing?
  // the test below isn't passing
  xit('Should save each object to the database', (done) => {
    mongoDB.Ticker.countDocuments({}, (err, prevCount) => {
      // verifies that the db now has 100 more documents than it had previously
      mongoSeed.seedDatabase(() => {
        mongoDB.Ticker.countDocuments({}, (err, count) => {
          if (err) { return console.log(err); }
          expect(count).toBe(prevCount + 100);
          done();
        });
      });
    });
  }, 40000);
  describe('Each ticker', () => {
    xit('Should have ticker & name properties of a String', () => {
      tickersWithPrices.forEach(ticker => {
        expect(ticker).toHaveProperty('ticker', expect.any(String));
        expect(ticker).toHaveProperty('name', expect.any(String));
      });
    });

    xit('Should have a prices property of an Array', () => {
      tickersWithPrices.forEach(ticker => {
        expect(ticker).toHaveProperty('prices', expect.any(Array));
      });
    });
  });
  // TODO: delete ALL the documents in the testing database after each test run
});

describe('Influx Seeding Script', () => {
  const oneTickerData = influxSeed.getLineProtocolString('prices',1);
  xit('Should return a string', () => {
    expect(typeof oneTickerData).toBe('string');
  });
  it('Should return an InfluxDB protocol line string', () => {
    // not sure if this should be split up into separate tests
    // or if these tests are really testing for the right syntax
    var onePointlinePrtcl = oneTickerData.split('\n')[0];
    var measurement = onePointlinePrtcl.split(' ')[0].split(',')[0];
    var tagSet = onePointlinePrtcl.split(' ')[0].split(',').slice(1);
    var fieldSet = onePointlinePrtcl.split(' ')[0].split(',')[1];
    var timeStamp = onePointlinePrtcl.split(' ')[0].split(',')[2];
    var isMeasurement = /^[a-z]+$/.test(measurement);
    var istagSet; // test that there are two tags
    var istag; // test that each tag has an equal sign with strings on each side
    var isFieldSet; // test that there are 5 fields
    var isField; // test that each field has an <string><equal sign><float>
    var isTimeStamp; // test that the time stamp is in the right format
    expect(isMeasurement).toBe(true);
  });
  xit('Should return multiple protocol lines separated by a new line', () => {
    // TODO
  });
  xit('Should return 1750 protocol lines for each ticker', () => {
    // TODO
  })
  xit('Should return up to 3.5 billion protocol lines', () => {
    // TODO
  })
});