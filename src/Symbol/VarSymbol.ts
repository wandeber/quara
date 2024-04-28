import {BuiltInTypeSymbol} from "./BuiltInTypeSymbol";
import {SymbolEntry} from "./SymbolEntry";





export class VarSymbol extends SymbolEntry {
  constructor(
    public name: string,
    public type: BuiltInTypeSymbol,
  ) {
    super(name, type);
  }

  toString() {
    return `<${this.name}:${this.type}>`;
  }
}
