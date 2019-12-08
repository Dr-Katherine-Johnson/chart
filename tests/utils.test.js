const utils = require('../client/src/utils.js');

// UTILS TESTS
describe('utils', () => {
  describe('calculateX', () => {
    it('Should return a number', () => {
      expect(utils.calculateX(31, 20, 676)).toEqual(expect.any(Number));
    });

    it('Should error when width is NOT a positive integer', () => {
      expect(() => utils.calculateX(31, 20, -1)).toThrowError();
      expect(() => utils.calculateX(31, 20, 1.5)).toThrowError();
      expect(() => utils.calculateX(31, 20, null)).toThrowError();
      expect(() => utils.calculateX(31, 20, 'horse')).toThrowError();
      expect(() => utils.calculateX(31, 20)).toThrowError();
    });

    it('Should error when dataPointCount or i are NOT positive integers or 0', () => {
      const invalidArgs = [1.4, -1.4, null, undefined, NaN, true, false, '', 'salmon', [], {}]
      const validArgs = [0, 1, 4567466];
      for (let i = 0; i < invalidArgs.length; i++) {
        expect(() => utils.calculateX(invalidArgs[i], 20, 1)).toThrowError();
        expect(() => utils.calculateX(31, invalidArgs[i], 1)).toThrowError();
      }
      for (let i = 0; i < validArgs.length; i++) {
        expect(() => utils.calculateX(validArgs[i], 20, 1)).not.toThrowError();
        expect(() => utils.calculateX(31, validArgs[i], 1)).not.toThrowError();
      }
    });
  });

  describe('calculateY', () => {
    it('Should return a number', () => {
      expect(utils.calculateY(80.12, 676, 13.41, 76.56)).toEqual(expect.any(Number));
      expect(utils.calculateY(0, 0, 0, 0)).toEqual(expect.any(Number));
    });

    it('Should error when price or height are NOT a number greater than 0', () => {
      const invalidArgs = [-1.4, null, undefined, NaN, true, false, '', 'salmon', [], {}]
      const validArgs = [50, 89.32];
      for (let i = 0; i < invalidArgs.length; i++) {
        expect(() => utils.calculateY(invalidArgs[i], 676, 13.41, 100.56)).toThrowError();
        expect(() => utils.calculateY(100, invalidArgs[i], 13.41, 100.56)).toThrowError();
      }
      for (let i = 0; i < validArgs.length; i++) {
        expect(() => utils.calculateY(validArgs[i], 676, 13.41, 100.56)).not.toThrowError();
        expect(() => utils.calculateY(100, validArgs[i], 13.41, 100.56)).not.toThrowError();
      }
    });

    it('Should error when priceRange is NOT a number greater than 0', () => {
      const invalidArgs = [-1.4, null, undefined, NaN, true, false, '', 'salmon', [], {}]
      const validArgs = [50, 89.32];
      invalidArgs.forEach(priceRange => {
        expect(() => utils.calculateY(20, 676, 13.41, priceRange)).toThrowError();
      });
      validArgs.forEach(priceRange => {
        expect(() => utils.calculateY(20, 676, 13.41, priceRange)).not.toThrowError();
      });
    });

    it('Should error when lowest is NOT a number greater than 0', () => {
      const invalidLowest = [-1.4, null, undefined, NaN, true, false, '', 'salmon', [], {}]
      const validLowest = [50, 60];
      invalidLowest.forEach(lowest => {
        expect(() => utils.calculateY(100, 676, lowest, 76.56)).toThrowError();
      });
      validLowest.forEach(lowest => {
        expect(() => utils.calculateY(100, 676, lowest, 76.56)).not.toThrowError();
      });
    });

    it('Should error when price is less than lowest', () => {
      const message = 'The current price must be greater than or equal to the lowest price.'
      expect(() => utils.calculateY(10, 676, 13.41, 76.56)).toThrowError(message);
    });

    it('Should error when price is greater than lowest + priceRange', () => {
      const message = 'The current price must be less than lowest + priceRange';
      expect(() => utils.calculateY(150, 676, 13.41, 76.56)).toThrowError(message);
    });
  });
});