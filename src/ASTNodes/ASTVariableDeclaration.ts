import AST from "./AST";
import ASTVisitor from "./ASTVisitor";





export interface ASTVariableDeclarationVisitor extends ASTVisitor {
  visitASTVariableDeclaration(node: ASTVariableDeclaration): any;
}

export default class ASTVariableDeclaration extends AST {
  children: AST[] = [];

  typeNode: any;

  constructor(typeNode: any = null) {
    super();
    this.typeNode = typeNode;
  }


  
  visit(nodeVisitor: ASTVariableDeclarationVisitor) {
    return nodeVisitor.visitASTVariableDeclaration(this);
  }
}
