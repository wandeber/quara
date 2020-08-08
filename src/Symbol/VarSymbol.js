"use strict";

const {Symbol} = require("./Symbol");





class VarSymbol extends Symbol {
  constructor(name, type) {
    super(name, type);
  }

  toString() {
    return `<${this.name}:${this.type}>`;
  }
}



module.exports = {VarSymbol};
