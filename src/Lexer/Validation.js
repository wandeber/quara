"use strict";





const VariableNameRegExp = /^[a-z0-9_$]+$/iu;

class Validation {
  static isValidVariableName(str) {
    return str.match(VariableNameRegExp);
  }
}



module.exports = {Validation};
