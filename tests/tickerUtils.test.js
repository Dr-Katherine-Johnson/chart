const tickerUtils = require('../seeds/tickerUtils.js');
const _ = require('lodash');

describe('Generate Char Codes Function', () => {
  const chars = tickerUtils.getAlphaNumeric();

  it('Should generate an array of numbers', () => {
    chars.forEach(ticker => {
      expect(typeof ticker).toBe('string');
    })
  })
  it('The first 26 codes should correspond to letters A through Z', () => {
    const firstUpperCaseLetter = chars[0];
    const lastUpperCaseLetter = chars[25];
    expect(firstUpperCaseLetter).toBe('A');
    expect(lastUpperCaseLetter).toBe('Z');
  });
  it('The second 26 codes should correspond to codes lower case letters a through z', () => {
    const firstLowerCaseLetter = chars[26];
    const lastLowerCaseLetter = chars[51];
    expect(firstLowerCaseLetter).toBe('a');
    expect(lastLowerCaseLetter).toBe('z');
  });
  it('The last 10 codes should correspond to codes 47 to 58', () => {
    const firstNumber = chars[52];
    const lastNumber = chars[61];
    expect(firstNumber).toBe("0");
    expect(lastNumber).toBe("9");
  });
  it('Should generate 62 codes', () => {
    expect(chars).toHaveLength(62);
  });
  it('On repeated calls, should generate the same codes, in the same order', () => {
    const chars2 = tickerUtils.getAlphaNumeric();
    expect(JSON.stringify(chars)).toBe(JSON.stringify(chars2));
  });
});

