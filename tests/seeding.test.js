const seed = require('../seeds/seed.js');

// TODO: connect to separate test database for running test runner file
// SEEDING SCRIPT
describe('Seeding Script', () => {
  // const tickersWithPrices = seed.start();
  xit('Should return an array of 2 million objects', () => {
    expect(tickersWithPrices).toHaveLength(2000000);
  });

  xit('Should save each object to the database', (done) => {
    // How to test different databases?

    // db.Ticker.countDocuments({}, (err, prevCount) => {
    //   // verifies that the db now has 100 more documents than it had previously
    //   seed.seedDatabase(() => {
    //     db.Ticker.countDocuments({}, (err, count) => {
    //       if (err) { return console.log(err); }
    //       expect(count).toBe(prevCount + 100);
    //       done();
    //     });
    //   });
    // });

    // Should the timeout time be longer?
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