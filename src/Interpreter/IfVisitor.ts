import {If} from "../ASTNodes/If";
import {ASTVisitor} from "./ASTInterpreter";
import {Scope} from "./Scope";
import {IVisitorResult} from "./VisitorResult";



export class IfVisitor extends ASTVisitor {
  visit(node: If, scope: Scope): IVisitorResult {
    let result;
    let newScope = scope.getChildScope("if");
    let conditionResult = this.engine.visit(node.condition, newScope);
    if (conditionResult?.value) {
      result = this.engine.visit(node.ifTrue, newScope);
    }
    else if (node.ifFalse) {
      result = this.engine.visit(node.ifFalse, newScope);
    }
    return {
      value: result?.value,
      output: result?.output ? String(result.output) : undefined,
    };
  }
}
