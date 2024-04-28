import {SymbolEntry} from "./SymbolEntry";





export class BuiltInTypeSymbol extends SymbolEntry {
  constructor(public name: string) {
    super(name);
  }

  toString() {
    return this.name;
  }
}
