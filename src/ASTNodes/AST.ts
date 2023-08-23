import ASTVisitor from "./ASTVisitor";
import Token from "../Token";



export interface IASTNode {
  visit(visitor: ASTVisitor): any;
}

export default abstract class AST implements IASTNode {
  abstract visit(visitor: ASTVisitor): any;
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
