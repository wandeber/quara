import ASTCompound from "./ASTCompound";
import ASTVisitor from "./ASTVisitor";





export default class ASTVariableDeclaration extends ASTCompound {
  typeNode: any;

  constructor(typeNode: any = null) {
    super();
    this.typeNode = typeNode;
  }

  visit(nodeVisitor: ASTVisitor) {
    return nodeVisitor.visitASTVariableDeclaration(this);
  }
}
