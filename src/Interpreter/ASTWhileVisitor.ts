import ASTWhile from "../ASTNodes/ASTWhile";
import ASTVisitor from "./ASTVisitor";



export default class ASTIfVisitor extends ASTVisitor {
  visit(node: ASTWhile) {
    let result;
    while (this.interpreter.visit(node.condition)) {
      if (node.body) {
        result = this.interpreter.visit(node.body);
      }
    }
    return result;
  }
}
