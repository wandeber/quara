"use strict";





const VariableNameRegExp = /^[a-z0-9_$]+$/i;

class Validation {
  static isValidVariableName(str) {
    return str.match(VariableNameRegExp);
  }
}



module.exports = {Validation};