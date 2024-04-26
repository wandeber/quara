import {SymbolEntry} from "./SymbolEntry";





export class VarSymbol extends SymbolEntry {
  toString() {
    return `<${this.name}:${this.type}>`;
  }
}
