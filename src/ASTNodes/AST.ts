import ASTVisitor from "../Interpreter/ASTVisitor";
import Token from "../Token";



export interface IAST {
  accept(visitor: ASTVisitor): any;
}

export default class AST implements IAST {
  accept(visitor: ASTVisitor): any {
    // console.log("AST.visit", visitor);
    return visitor.visit(this);
  }

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
