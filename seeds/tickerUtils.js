const _ = require('lodash');

module.exports = {
  // We'll generate charCodes in order of Uppercase letters, Lowercase Letters, and then Numbers 0-9
  getAlphaNumeric () {
    let alphaNums = [];
    // [65 - 90]  upper alpha (A-Z)
    for (let i = 65; i < 91; i++) {
      var char = String.fromCharCode(i);
      alphaNums.push(char);
    }
    // [97 -122]  lower alpha (a-z)
    for (let i = 97; i < 123; i++) {
      var char = String.fromCharCode(i);
      alphaNums.push(char);
    }
    // [48 - 57]  numeric (0-9)
    for (let i = 48; i < 58; i++) {
      var char = String.fromCharCode(i);
      alphaNums.push(char);
    }
    return alphaNums;
  },
  getNtickers() {

  }
};