"use strict";

const AlphaRegExp = /^[a-z]+$/iu;
const AlphanumericRegExp = /^[a-z0-9]+$/iu;





class Types {
  static isInteger(str) {
    if (isNaN(str)) {
      return false;
    }
    let value = parseFloat(str); // parseFloat parses 1 to 1.0.
    return Number.isInteger(value); // isInteger returns true for cases like 1.0.
  }

  static isNumber(str) {
    return !isNaN(str);
  }

  static isAlpha(str) {
    return str.match(AlphaRegExp);
  }

  static isAlphanumeric(str) {
    return str.match(AlphanumericRegExp);
  }
}

const BLib = {
  Types
};



module.exports = {BLib, ...BLib};
