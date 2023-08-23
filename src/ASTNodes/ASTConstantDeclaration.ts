import ASTVariableDeclaration from "./ASTVariableDeclaration";
import ASTVisitor from "./ASTVisitor";





export default class ASTConstantDeclaration extends ASTVariableDeclaration {
  visit(nodeVisitor: ASTVisitor) {
    return nodeVisitor.visitASTConstantDeclaration(this);
  }
}
