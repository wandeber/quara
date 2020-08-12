"use strict";

const {Symbol} = require("./Symbol");





class BuiltInTypeSymbol extends Symbol {
  toString() {
    return this.name;
  }
}



module.exports = {BuiltInTypeSymbol};
