"use strict";

const {Symbol} = require("./Symbol");





class BuiltInTypeSymbol extends Symbol {
  constructor(name) {
    super(name);
  }

  toString() {
    return this.name;
  }
}



module.exports = {BuiltInTypeSymbol};
