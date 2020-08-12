"use strict";

const {Symbol} = require("./Symbol");





class VarSymbol extends Symbol {
  toString() {
    return `<${this.name}:${this.type}>`;
  }
}



module.exports = {VarSymbol};
