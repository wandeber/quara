export default class SymbolEntry {
  constructor(public name: string, public type: any = null) {
    this.name = name;
    this.type = type;
  }
}
