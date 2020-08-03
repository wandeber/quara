"use strict";





const Types = {
  isInteger(str) {
    if (isNaN(str)) {
      return false;
    }
    let value = parseFloat(str); // parseFloat parses 1 to 1.0.
    return Number.isInteger(value); // isInteger returns true for cases like 1.0.
  },

  isNumber(str) {
    return !isNaN(str);
  }
}

const BLib = {
  Types
}



module.exports = {BLib, ...BLib};