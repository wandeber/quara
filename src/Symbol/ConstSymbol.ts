import {SymbolEntry} from "./SymbolEntry";





export class ConstSymbol extends SymbolEntry {
  toString() {
    return `<${this.name}:${this.type}>`;
  }
}
