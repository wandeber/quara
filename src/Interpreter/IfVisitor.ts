import {If} from "../ASTNodes/If";
import {ASTVisitor} from "./ASTInterpreter";
import {IVisitorResult} from "./VisitorResult";



export class IfVisitor extends ASTVisitor {
  visit(node: If): IVisitorResult {
    let result;
    let conditionResult = this.engine.visit(node.condition);
    if (conditionResult?.value) {
      result = this.engine.visit(node.ifTrue);
    }
    else if (node.ifFalse) {
      result = this.engine.visit(node.ifFalse);
    }
    return {
      value: result?.value,
      output: result?.output ? String(result.output) : undefined,
    };
  }
}
