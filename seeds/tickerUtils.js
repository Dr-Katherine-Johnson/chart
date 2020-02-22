module.exports = {
  // We'll generate characters in order of Uppercase letters, Lowercase Letters, and then Numbers 0-9
  // TODO: would be nice to generate only upper alpha, upper+lower, upper+lower+nums, depending on what you needed
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
  // return an array of all unique combinations of length K each for a set of M elements -> M choose K
        // QUESTION: would it be better to deal with strings or arrays as the first arg?
  chooseKCombos (string, k) {
    // initialize combination array
    var combos = [];
    // Edge cases: make sure k >= the number of elements in set
    if (k > string.length) {
      // no solution
      return new Error(`Not enough elements to generate combinations of length ${k}`);
    } else if (k === string.length) {
    // edge case: set.length choose k < maxCombos?
    // two easy cases
    // 1. you're choosing M out of M elements
      return [string]; // only one possible combo
    } else if (k === 1) {
      // if you're choosing 1, there are M max combinations
      for (let i = 0; i < string.length; i++) {
        combos.push(string[i])
      }
      return combos;
    }
    // otherwise compute combinations
    // When the length drops below (k-1), we cannot find any (k-1)-combos, hence the upper limit for the iteration:
    for (let i = 0; i < string.length; i++) {
      var headChar = string.substring(i, i + 1);
      // Find the combinations for the tail/end of the string
      var tailCombos = this.chooseKCombos(string.slice(i + 1), k - 1);
      // For each (k-1)-combination we join it with the current
      // and store it to the set of k-combinations.
      for (let j = 0; j < tailCombos.length; j++) {
        combos.push(headChar.concat(tailCombos[j]));
      }
    }
    return combos;
  }
};