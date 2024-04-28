import {If} from "../ASTNodes/If";
import {ASTVisitor} from "./ASTInterpreter";
import {Scope} from "./Scope";
import {IVisitorResult} from "./VisitorResult";



export class IfVisitor extends ASTVisitor {
  visit(node: If, scope: Scope): IVisitorResult {
    let result;
    let conditionResult = this.engine.visit(node.condition, scope);
    if (conditionResult?.value) {
      result = this.engine.visit(node.ifTrue, scope);
    }
    else if (node.ifFalse) {
      result = this.engine.visit(node.ifFalse, scope);
    }
    return {
      value: result?.value,
      output: result?.output ? String(result.output) : undefined,
    };
  }
}
