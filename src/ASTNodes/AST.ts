import ASTVisitor from "./ASTVisitor";
import Token from "../Token";





export default class AST {
  visit(visitor: ASTVisitor) {
    console.log("Node visitor", visitor);
    throw new Error("AST node visit...");
  }
}

export interface ASTWithToken extends AST {
  token: Token;
}

export interface ASTWithValue extends AST {
  value: string|number|boolean;
}

export interface ASTWithName extends AST {
  name: string;
}

export interface ASTWithChildren extends AST {
  children: AST[];
}
