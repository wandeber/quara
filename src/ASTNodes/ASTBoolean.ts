import ASTVisitor from "./ASTVisitor";
import ASTWithValue from "./ASTWithValue";





export default class ASTBoolean extends ASTWithValue {
  value: boolean;

  visit(nodeVisitor: ASTVisitor) {
    return nodeVisitor.visitASTBoolean(this);
  }
}
