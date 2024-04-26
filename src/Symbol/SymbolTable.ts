import {BuiltInTypeSymbol} from "./BuiltInTypeSymbol";
import {SymbolEntry} from "./SymbolEntry";





export class SymbolTable {
  public symbols: Map<string, SymbolEntry>;

  constructor() {
    this.symbols = new Map();
    this.initBuiltInSymbols();
  }

  initBuiltInSymbols() {
    this.define(new BuiltInTypeSymbol("any"));
    this.define(new BuiltInTypeSymbol("bool"));
    this.define(new BuiltInTypeSymbol("char"));
    this.define(new BuiltInTypeSymbol("int"));
    this.define(new BuiltInTypeSymbol("float"));
    this.define(new BuiltInTypeSymbol("double"));
    this.define(new BuiltInTypeSymbol("string"));
  }

  define(symbol: SymbolEntry) {
    this.symbols.set(symbol.name, symbol);
  }

  lookup(name: string) {
    return this.symbols.get(name);
  }

  toString() {
    return "Symbols: ";
  }
}



export default SymbolTable;
