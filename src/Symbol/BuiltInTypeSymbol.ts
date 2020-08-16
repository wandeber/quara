import SymbolEntry from "./SymbolEntry";





export default class BuiltInTypeSymbol extends SymbolEntry {
  toString() {
    return this.name;
  }
}
