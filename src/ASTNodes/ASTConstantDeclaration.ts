import AST from "./AST";
import ASTVisitor from "./ASTVisitor";





export interface ASTConstantDeclarationVisitor extends ASTVisitor {
  visitASTConstantDeclaration(node: ASTConstantDeclaration): any;
}

export default class ASTConstantDeclaration extends AST {
  children: AST[] = [];

  typeNode: any;

  constructor(typeNode: any = null) {
    super();
    this.typeNode = typeNode;
  }


  visit(nodeVisitor: ASTConstantDeclarationVisitor) {
    return nodeVisitor.visitASTConstantDeclaration(this);
  }
}
