import ASTVisitor from "./ASTVisitor";
import ASTWithValue from "./ASTWithValue";





export default class ASTNumber extends ASTWithValue {
  value: number;

  visit(nodeVisitor: ASTVisitor) {
    return nodeVisitor.visitASTNumber(this);
  }
}
