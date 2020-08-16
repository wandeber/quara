import BuiltInTypeSymbol from "./BuiltInTypeSymbol";
import SymbolEntry from "./SymbolEntry";





class SymbolTable {
  public symbols: Map<string, SymbolEntry>;

  initBuiltInSymbols() {
    this.define(new BuiltInTypeSymbol("any"));
    this.define(new BuiltInTypeSymbol("boolean"));
    // this.define(new BuiltInTypeSymbol('char'));
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
