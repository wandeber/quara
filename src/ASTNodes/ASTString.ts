import ASTVisitor from "./ASTVisitor";
import ASTWithValue from "./ASTWithValue";





export default class ASTString extends ASTWithValue {
  value: string;

  visit(nodeVisitor: ASTVisitor) {
    return nodeVisitor.visitASTString(this);
  }
}
