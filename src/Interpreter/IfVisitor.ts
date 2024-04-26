import {If} from "../ASTNodes/If";
import {ASTVisitor} from "./ASTVisitor";
import {IVisitorResult} from "./VisitorResult";



export class IfVisitor extends ASTVisitor {
  visit(node: If): IVisitorResult {
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
