import AST from "./AST";
import ASTVisitor from "./ASTVisitor";





export default class ASTConstantDeclaration extends AST {
  children: AST[] = [];

  typeNode: any;

  constructor(typeNode: any = null) {
    super();
    this.typeNode = typeNode;
  }


  visit(nodeVisitor: ASTVisitor) {
    return nodeVisitor.visitASTConstantDeclaration(this);
  }
}
