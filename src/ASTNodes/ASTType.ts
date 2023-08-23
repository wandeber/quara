import AST from "./AST";
import ASTVisitor from "./ASTVisitor";
import Token from "../Token";



export default class ASTType extends AST {
  value: string;

  constructor(public token: Token) {
    super();
    this.value = String(token.value);
  }



  visit(nodeVisitor: ASTVisitor) {
    return nodeVisitor.visitASTType(this);
  }
}
