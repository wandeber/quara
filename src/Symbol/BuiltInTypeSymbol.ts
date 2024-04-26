import {SymbolEntry} from "./SymbolEntry";





export class BuiltInTypeSymbol extends SymbolEntry {
  toString() {
    return this.name;
  }
}
