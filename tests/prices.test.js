const prices = require('../seeds/prices.js');

// PRICES SEEDING SCRIPT
describe('Prices Seeding Function', () => {
  describe('twoDecimalPlaces', () => {
    it('Should return a floating point number with only two decimal places', () => {
      expect(prices.twoDecimalPlaces(123.456789)).toBeCloseTo(123.45);
    });

    it('Should return NaN with no argument', () => {
      expect(prices.twoDecimalPlaces()).toBeNaN();
    })
  });

  describe('createAnchorPrice', () => {
    it('should return a number between 0 and less than 1000', () => {
      let startingPrice;
      for (let i = 0; i < 1000; i++) {
        startingPrice = prices.createAnchorPrice(1000);
        expect(startingPrice >= 0 && startingPrice < 1000).toBe(true);
      }
    });
  });

  describe('lessThanTenPercentDifferent', () => {
    it('should return a number that is less than 10% different - either greater or lesser - than its argument', () => {

      let random, num;
      for (let i = 0; i < 1000; i++) {
        random = Math.random() * 1000;
        num = prices.lessThanTenPercentDifferent(random);

        // verify that num is either
        // greater than num * 0.90, OR
        // less than num * 1.10
        expect((num > num * 0.90) || (num < num * 1.10)).toBe(true);
      }
    });
  });

  describe('generateName', () => {
    const name1 = prices.generateName();
    const name2 = prices.generateName();

    it('Should generate a string', () => {
      expect(name1).toEqual(expect.any(String));
    });

    it('Should generate a random name', () => {
      expect(name1).not.toBe(name2);
    });

  });

  describe('generatePrice', () => {
    const priceObject = prices.generatePrice();

    it('should return an object', () => {
      expect(priceObject).toBeInstanceOf(Object);
    });

    it('should not return an empty object', () => {
      expect(Object.keys(priceObject)).not.toHaveLength(0);
    });

    it('should have properties open, high, low, & close, of types INTEGER', () => {
      const keys = ['open', 'high', 'low', 'close'];
      keys.forEach(key => {
        expect(priceObject[key]).toEqual(expect.any(Number));
      })
    });

    it('high should be the highest price', () => {
      expect(priceObject['high']).toBeGreaterThanOrEqual(priceObject['low']);
      expect(priceObject['high']).toBeGreaterThanOrEqual(priceObject['open']);
      expect(priceObject['high']).toBeGreaterThanOrEqual(priceObject['close']);
    });

    it('low should be the lowest price', () => {
      expect(priceObject['low']).toBeLessThanOrEqual(priceObject['high']);
      expect(priceObject['low']).toBeLessThanOrEqual(priceObject['open']);
      expect(priceObject['low']).toBeLessThanOrEqual(priceObject['close']);
    });

    it(`in one price object, high is less than 20% different from low`, () => {
      const nextPrice = prices.generatePrice(priceObject);
      expect((nextPrice.high * 0.8) < nextPrice.low).toBe(true);
    });
  });

  describe('generatePricesList', () => {
    const pricesList = prices.generatePricesList();

    it('Should return an array', () => {
      expect(pricesList).toBeInstanceOf(Array);
    });

    it('Array should have 1750 objects', () => {
      expect(pricesList).toHaveLength(1750);
    });

    it(`the previous day's close should be less than or equal to 10% different from the next day's open`, () => {
      let result, current, previous, above, below;
      // iterate through pricesList, starting at the second element
      for (let i = 1; i < 1750; i++) {
        // check the current element's open with the previous element's close
        current = pricesList[i].open
        previous = pricesList[i - 1].close

        // expect them to be less than or equal to 10% different from each other
        below = prices.twoDecimalPlaces(previous * 0.90);
        above = prices.twoDecimalPlaces(previous * 1.10);

        if (current >= below && current <= previous || current <= above && current >= previous) {
          result = true;
        } else {
          result = false;
        }
        expect(result).toBe(true);
      }
    });
  });

  describe('Date', () => {
    const pricesList = prices.generatePricesList();

    it('Each price object should have a dateTime as an ISO 8601 Extended Format string', () => {
      pricesList.forEach(price => {
        expect(typeof price.dateTime).toBe('string');
        expect(new Date(price.dateTime)).toBeInstanceOf(Date);
      });
    });

    it('The first dateTime should have a time of 9:30 AM', () => {
      expect(new Date(pricesList[0].dateTime).getUTCHours()).toBe(9);
      expect(new Date(pricesList[0].dateTime).getUTCMinutes()).toBe(30);
    });

    it('Each subsequent dateTime in a day should add 1 hour to the time', () => {
      // iterate through the collection, starting from the second element
      for (let i = 1; i < pricesList.length; i++) {
        // if the index does NOT divide evenly by 7
        if (i % 7 !== 0) {
          // check that the current dateTime's hour is one greater than the previous dateTime's hour
          expect(new Date(pricesList[i].dateTime).getUTCHours()).toBe(new Date(pricesList[i - 1].dateTime).getUTCHours() + 1);
        }
      }
    });

    it('Every 7th dateTime should increment the day by 1', () => {
      for (let i = 1; i < pricesList.length; i++) {
        if (i % 7 === 0) {
          expect(new Date(pricesList[i].dateTime).getTime()).toBe(new Date(pricesList[i - 1].dateTime).getTime() + 64800000);
        }
      }
    });
  });
});