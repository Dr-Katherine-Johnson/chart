module.exports = {
  // We'll generate charCodes in order of Uppercase letters, Lowercase Letters, and then Numbers 0-9
  getAlphaNumericCodes () {
    let alphaNumericCodes = [];
    // [65 - 90]  upper alpha (A-Z)
    for (let i = 65; i < 91; i++) {
      alphaNumericCodes.push(i);
    }
    // [96 -123]  lower alpha (a-z)
    for (let i = 97; i < 123; i++) {
      alphaNumericCodes.push(i);
    }
    // [47 - 58]  numeric (0-9)
    for (let i = 48; i < 58; i++) {
      alphaNumericCodes.push(i);
    }
    return alphaNumericCodes;
  }
};