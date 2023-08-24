import ASTVisitor from "../Interpreter/ASTVisitor";
import Token from "../Token";



export interface IASTNode {
  accept(visitor: ASTVisitor): any;
}

export default class AST implements IASTNode {
  accept(visitor: ASTVisitor): any {
    // console.log("AST.visit", visitor);
    return visitor.visit(this);
  }
}


export interface IASTWithToken extends IASTNode {
  token: Token;
}

export interface IASTWithValue extends IASTNode {
  value: string|number|boolean;
}

export interface IASTWithName extends IASTNode {
  name: string;
}

export interface IASTWithChildren extends IASTNode {
  children: AST[];
}
