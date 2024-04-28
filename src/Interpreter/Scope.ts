


export class Member {
  constructor(
    public name: string,
    public value: any,
    public doc: string,
  ) {}
}

export class Scope {
  public members: Map<string, any>;

  constructor(
    public name: string = "global",
    public level: number = 0,
    public parent: Scope = null,
  ) {
    this.members = new Map();
  }

  insert(name: any, value: any = null, doc?: any) {
    this.members.set(name, new Member(name, value, doc));
  }

  lookup(name: string, deep = true): Member {
    let member = this.members.get(name);
    if (deep && !member && this.parent) {
      member = this.parent.lookup(name, deep);
    }
    return member;
  }

  getMemberValue(name: string, deep = true): any {
    const member = this.lookup(name, deep);
    return member ? member.value : undefined;
  }

  getMemberDoc(name: string, deep = true): string {
    const member = this.lookup(name, deep);
    return member ? member.doc : undefined;
  }

  getChildScope(name: string) {
    const childScope = new Scope(name, this.level + 1, this);
    return childScope;
  }

  toString() {
    return "Scopes: ";
  }
}
