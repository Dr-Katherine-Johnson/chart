const utils = require('../client/src/utils.js');

// UTILS TESTS
describe('utils', () => {
  describe('calcX', () => {
    it('Should return a number', () => {
      expect(utils.calcX(31, 20, 676)).toEqual(expect.any(Number));
    });

    it('Should error when width is NOT a positive integer', () => {
      expect(() => utils.calcX(31, 20, -1)).toThrowError();
      expect(() => utils.calcX(31, 20, 1.5)).toThrowError();
      expect(() => utils.calcX(31, 20, null)).toThrowError();
      expect(() => utils.calcX(31, 20, 'horse')).toThrowError();
      expect(() => utils.calcX(31, 20)).toThrowError();
    });

    it('Should error when dataPointCount or i are NOT positive integers or 0', () => {
      const invalidArgs = [1.4, -1.4, null, undefined, NaN, true, false, '', 'salmon', [], {}]
      const validArgs = [0, 1, 4567466];
      for (let i = 0; i < invalidArgs.length; i++) {
        expect(() => utils.calcX(invalidArgs[i], 20, 1)).toThrowError();
        expect(() => utils.calcX(31, invalidArgs[i], 1)).toThrowError();
      }
      for (let i = 0; i < validArgs.length; i++) {
        expect(() => utils.calcX(validArgs[i], 20, 1)).not.toThrowError();
        expect(() => utils.calcX(31, validArgs[i], 1)).not.toThrowError();
      }
    });
  });

  describe('calcY', () => {
    it('Should return a number', () => {
      expect(utils.calcY(80.12, 676, 13.41, 76.56)).toEqual(expect.any(Number));
      expect(utils.calcY(0, 0, 0, 0)).toEqual(expect.any(Number));
    });

    it('Should error when price or height are NOT a number greater than 0', () => {
      const invalidArgs = [-1.4, null, undefined, NaN, true, false, '', 'salmon', [], {}]
      const validArgs = [50, 89.32];
      for (let i = 0; i < invalidArgs.length; i++) {
        expect(() => utils.calcY(invalidArgs[i], 676, 13.41, 100.56)).toThrowError();
        expect(() => utils.calcY(100, invalidArgs[i], 13.41, 100.56)).toThrowError();
      }
      for (let i = 0; i < validArgs.length; i++) {
        expect(() => utils.calcY(validArgs[i], 676, 13.41, 100.56)).not.toThrowError();
        expect(() => utils.calcY(100, validArgs[i], 13.41, 100.56)).not.toThrowError();
      }
    });

    it('Should error when priceRange is NOT a number greater than 0', () => {
      const invalidArgs = [-1.4, null, undefined, NaN, true, false, '', 'salmon', [], {}]
      const validArgs = [50, 89.32];
      invalidArgs.forEach(priceRange => {
        expect(() => utils.calcY(20, 676, 13.41, priceRange)).toThrowError();
      });
      validArgs.forEach(priceRange => {
        expect(() => utils.calcY(20, 676, 13.41, priceRange)).not.toThrowError();
      });
    });

    it('Should error when lowest is NOT a number greater than 0', () => {
      const invalidLowest = [-1.4, null, undefined, NaN, true, false, '', 'salmon', [], {}]
      const validLowest = [50, 60];
      invalidLowest.forEach(lowest => {
        expect(() => utils.calcY(100, 676, lowest, 76.56)).toThrowError();
      });
      validLowest.forEach(lowest => {
        expect(() => utils.calcY(100, 676, lowest, 76.56)).not.toThrowError();
      });
    });

    it('Should error when price is less than lowest', () => {
      const message = 'The current price must be greater than or equal to the lowest price.'
      expect(() => utils.calcY(10, 676, 13.41, 76.56)).toThrowError(message);
    });

    it('Should error when price is greater than lowest + priceRange', () => {
      const message = 'The current price must be less than lowest + priceRange';
      expect(() => utils.calcY(150, 676, 13.41, 76.56)).toThrowError(message);
    });
  });

  describe('calcHoveredTimeFrame', () => {
    it('Should return a positive integer', () => {
      const result = utils.calcHoveredTimeFrame(7, 100, 676);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(result)).toBe(true);
    });

    it('Should error if dataPointCount is NOT a positive integer greater than or equal to 0', () => {
      const invalidArgs = [1.4, -1.4, -90, null, undefined, NaN, true, false, '', 'salmon', [], {}]
      const validArgs = [0, 1, 5, 10, 100, 500, 1700]

      invalidArgs.forEach(arg => {
        expect(() => utils.calcHoveredTimeFrame(arg, 100, 676)).toThrowError();
      });
      validArgs.forEach(arg => {
        expect(() => utils.calcHoveredTimeFrame(arg, 100, 676)).not.toThrowError();
      });
    });

    it('Should error if offsetX or width are NOT positive numbers', () => {
      const invalidArgs = [-1.4, -90, null, undefined, NaN, true, false, '', 'salmon', [], {}]
      const validArgs = [1, 5, 6.5, 10, 100, 234.64, 500, 1700]

      invalidArgs.forEach(arg => {
        expect(() => utils.calcHoveredTimeFrame(7, arg, 676)).toThrowError();
        expect(() => utils.calcHoveredTimeFrame(7, 100, arg)).toThrowError();
      });
      validArgs.forEach(arg => {
        expect(() => utils.calcHoveredTimeFrame(7, arg, 676)).not.toThrowError();
        expect(() => utils.calcHoveredTimeFrame(7, 100, arg)).not.toThrowError();
      });
    });
  });

  describe('calcHighAndLow', () => {
    let prices = [
      {
        dateTime: new Date("2019-11-16T22:27:19.319Z"),
        open: 264.03,
        high: 264.40,
        low: 264.02,
        close: 264.35,
        volume: 96770
      },
      {
        dateTime: new Date("2018-11-16T22:27:19.319Z"),
        open: 24.03,
        high: 26,
        low: 22.10,
        close: 25.31,
        volume: 170
      },
    ]

    const result = utils.calcHighAndLow(prices);

    it('Should return an array with two positive numbers', () => {
      expect(result).toEqual(expect.any(Array));
      expect(result).toHaveLength(2);
      result.forEach(value => {
        expect(value).toEqual(expect.any(Number));
        expect(Number.isFinite(value)).toBe(true);
        expect(value).toBeGreaterThanOrEqual(0);
      });
    });

    it('Should error if prices is NOT an array with at least two objects, which each contain numbers at properties high and low ', () => {
      const invalidArgs = [
        [],
        [1.4],
        [6, 5],
        [null, true],
        [{}, 3],
        [{}, {}],
        [{}, {
          high: 5
        }],
        [{}, {
          high: 5,
          low: 'tuna'
        }],
        [{}, {
          high: [],
          low: 'tuna'
        }]
      ];

      const validArgs = [
        [
          {
            high: 5.4,
            low: 3.2
          },
          {
            high: 10.2,
            low: 9.12
          }
        ]
      ]
      invalidArgs.forEach(args => {
        expect(() => utils.calcHighAndLow(args).toThrowError());
      });
      validArgs.forEach(args => {
        expect(() => utils.calcHighAndLow(args).not.toThrowError());
      });
    });

    it('high should be greater than or equal to low', () => {
      expect(result[0]).toBeGreaterThanOrEqual(result[1]);
    });
  });

  describe('calcLeftOffset', () => {
    const validArgs = [[0, 0], [100, 0], [676, 42]];
    const invalidArgs = [[10, 40], [-1, -1], [5, -9], [null, null], [undefined, undefined], [NaN, NaN], [true, true], [false, false], ['', ''], ['salmon', 'salmon'], [[], []], [{}, {}]];

    it('Should return a number greater than or equal to 0 with valid arguments', () => {
      let result;
      validArgs.forEach(valid => {
        result = utils.calcLeftOffset(valid[0], valid[1]);
        expect(result).toEqual(expect.any(Number));
        expect(result >= 0).toBe(true);
      });
    });

    it('Should throw an error when leftMargin is greater than dLM OR dLM or leftMargin is NOT a number greater than or equal to 0', () => {
      invalidArgs.forEach(invalid => {
        const fn = () => {
          utils.calcLeftOffset(invalid[0], invalid[1])
        };
        expect(fn).toThrowError();
      });
    });
  });
});