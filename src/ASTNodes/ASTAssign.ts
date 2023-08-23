import ASTBinaryOperator from "./ASTBinaryOperator";
import ASTVisitor from "./ASTVisitor";





export default class ASTAssign extends ASTBinaryOperator {
  visit(nodeVisitor: ASTVisitor) {
    return nodeVisitor.visitASTAssign(this);
  }
}
