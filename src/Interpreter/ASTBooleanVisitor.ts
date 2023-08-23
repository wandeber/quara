import ASTBoolean from "../ASTNodes/ASTBoolean";
import ASTVisitor from "./ASTVisitor";



export default class ASTBooleanVisitor extends ASTVisitor {
  visit(node: ASTBoolean) {
    return node.value;
  }
}
