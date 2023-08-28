import ASTIf from "../ASTNodes/ASTIf";
import ASTVisitor from "./ASTVisitor";



export default class ASTIfVisitor extends ASTVisitor {
  visit(node: ASTIf) {
    let result;
    let conditionResult = this.interpreter.visit(node.condition);
    if (conditionResult) {
      result = this.interpreter.visit(node.ifTrue);
    }
    else if (node.ifFalse) {
      result = this.interpreter.visit(node.ifFalse);
    }
    return result;
  }
}
