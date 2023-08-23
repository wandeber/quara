import ASTVisitor from "./ASTVisitor";
import ASTWithValue from "./ASTWithValue";





export default class ASTChar extends ASTWithValue {
  value: string|number|boolean;

  visit(nodeVisitor: ASTVisitor) {
    return nodeVisitor.visitASTChar(this);
  }
}
