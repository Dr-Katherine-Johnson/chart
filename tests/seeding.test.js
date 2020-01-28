const mongoSeed = require('../seeds/mongo-seed.js');
const mongoDB = require('../db/index.js');
const influxSeed = require('../seeds/influx/seed.js');
// TODO: use chai syntax

// TODO: connect to separate test database for running test runner file
// SEEDING SCRIPTS
describe('Mongo Seeding Script', () => {
  const tickersWithPrices = mongoSeed.start();
  it('Should return an array of 100 objects', () => {
    expect(tickersWithPrices).toHaveLength(100);
  });
  // QUESTION: should it actually save to database when testing?
  it('Should save each object to the database', (done) => {
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
  const lineProtocol = influxSeed.getProtocolString('prices',100);
  it('Should return a string', () => {
    expect(lineProtocol) // to be a string;
  });
  xit('Should return an InfluxDb protocol line string', () => {
    // TODO
  });
  xit('Should return multiple protocol lines separated by a new line \\n', () => {
    // TODO
  });
  xit('Should return 1750 protocol lines for each ticker', () => {
    // TODO
  })
  xit('Should return up to 3.5 billion protocol lines', () => {
    // TODO
  })
});