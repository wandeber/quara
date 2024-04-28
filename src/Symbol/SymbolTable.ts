import {BuiltInTypeSymbol} from "./BuiltInTypeSymbol";
import {SymbolEntry} from "./SymbolEntry";





export class SymbolTable {
  public symbols: Map<string, SymbolEntry>;

  constructor(
    public name: string = "global",
    public level: number = 0,
    public parent: SymbolTable = null,
  ) {
    this.symbols = new Map();
    if (this.level === 0) {
      this.initBuiltInSymbols();
    }
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

  getChildScope(name: string) {
    const childScope = new SymbolTable(name, this.level + 1, this);
    return childScope;
  }

  toString() {
    return "Symbols: ";
  }
}



export default SymbolTable;
