import ASTIf from "../ASTNodes/ASTIf";
import ASTVisitor from "./ASTVisitor";
import {IVisitorResult} from "./VisitorResult";



export default class ASTIfVisitor extends ASTVisitor {
  visit(node: ASTIf): IVisitorResult {
    let result;
    let conditionResult = this.interpreter.visit(node.condition);
    if (conditionResult?.value) {
      result = this.interpreter.visit(node.ifTrue);
    }
    else if (node.ifFalse) {
      result = this.interpreter.visit(node.ifFalse);
    }
    return {
      value: result?.value,
      output: result?.output ? String(result.output) : undefined,
    };
  }
}
