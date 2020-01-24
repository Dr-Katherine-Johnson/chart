const tickerUtils = require('../seeds/tickerUtils.js');

describe('Generate Char Codes Function', () => {
  const charCodes = tickerUtils.getAlphaNumericCodes();

  it('Should generate an array of numbers', () => {
    charCodes.forEach(ticker => {
      expect(typeof ticker).toBe('number');
    })
  })
  it('The first 26 codes should correspond to letters A through Z', () => {
    const firstUpperCaseLetter = String.fromCharCode(charCodes[0]);
    const lastUpperCaseLetter = String.fromCharCode(charCodes[25]);
    expect(firstUpperCaseLetter).toBe('A');
    expect(lastUpperCaseLetter).toBe('Z');
  });
  it('The second 26 codes should correspond to codes lower case letters a through z', () => {
    const firstLowerCaseLetter = String.fromCharCode(charCodes[26]);
    const lastLowerCaseLetter = String.fromCharCode(charCodes[51]);
    expect(firstLowerCaseLetter).toBe('a');
    expect(lastLowerCaseLetter).toBe('z');
  });
  it('The last 10 codes should correspond to codes 47 to 58', () => {
    const firstNumber = String.fromCharCode(charCodes[52]);
    const lastNumber = String.fromCharCode(charCodes[61]);
    expect(firstNumber).toBe("0");
    expect(lastNumber).toBe("9");
  });
  it('Should generate 62 codes', () => {
    expect(charCodes).toHaveLength(62);
  });
  it('On repeated calls, should generate the same codes, in the same order', () => {
    const charCodes2 = tickerUtils.getAlphaNumericCodes();
    expect(JSON.stringify(charCodes)).toBe(JSON.stringify(charCodes2));
  });
});