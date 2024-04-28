import {BuiltInTypeSymbol} from './BuiltInTypeSymbol';

export class SymbolEntry {
  public category: string;

  constructor(
    public name: string,
    public type: BuiltInTypeSymbol = null,
    public nullable: boolean = false,
  ) {
    this.category = this.constructor.name;
  }
}
