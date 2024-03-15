import SymbolEntry from "./SymbolEntry";





export default class VarSymbol extends SymbolEntry {
  toString() {
    return `<${this.name}:${this.type}>`;
  }
}
