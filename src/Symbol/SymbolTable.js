"use strict";

const BuiltInTypeSymbol = require("./BuiltInTypeSymbol");





class SymbolTable {
  constructor() {
    this.symbols = {};
  }

  initBuiltInSymbols() {
    this.define(new BuiltInTypeSymbol('any'));
    this.define(new BuiltInTypeSymbol('boolean'));
    this.define(new BuiltInTypeSymbol('char'));
    this.define(new BuiltInTypeSymbol('int'));
    this.define(new BuiltInTypeSymbol('float'));
    this.define(new BuiltInTypeSymbol('double'));
    this.define(new BuiltInTypeSymbol('string'));
  }

  define(symbol) {
    this.symbols[symbol.name] = symbol;
  }

  lookup(name) {
    return this.symbols[name];
  }

  toString() {
    return `Symbols: `;
  }
}



module.exports = {SymbolTable};
