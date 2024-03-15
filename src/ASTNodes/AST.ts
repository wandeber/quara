import Token from "../Token";



export interface IAST {
  toString(): string;
}

export default class AST implements IAST {
  toString() {
    return this.constructor.name;
  }
}


export interface IASTWithToken extends IAST {
  token: Token;
}

export interface IASTWithValue extends IAST {
  value: string|number|boolean;
}

export interface IASTWithName extends IAST {
  name: string;
}

export interface IASTWithChildren extends IAST {
  children: AST[];
}
