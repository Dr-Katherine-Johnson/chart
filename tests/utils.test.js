const utils = require('../client/src/utils.js');

// UTILS TESTS
describe('calculateX', () => {
  it('Should return a number', () => {
    expect(utils.calculateX(31, 20, 676)).toEqual(expect.any(Number));
  });

  it('Should throw an error when width is not a positive integer', () => {
    expect(() => utils.calculateX(31, 20, -1)).toThrowError();
    expect(() => utils.calculateX(31, 20, 1.5)).toThrowError();
    expect(() => utils.calculateX(31, 20, null)).toThrowError();
    expect(() => utils.calculateX(31, 20, 'horse')).toThrowError();
    expect(() => utils.calculateX(31, 20)).toThrowError();
  });

  it('Should throw an error when dataPointCount or i are not positive integers or 0', () => {
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