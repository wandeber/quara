import {While} from "../ASTNodes/While";
import {ASTVisitor} from "./ASTInterpreter";
import {IVisitorResult} from "./VisitorResult";
import {Scope} from "./Scope";




export class WhileVisitor extends ASTVisitor {
  visit(node: While, scope: Scope): IVisitorResult {
    let result, value;
    let output = "";
    let newScope = scope.getChildScope("while");
    while (this.engine.visit(node.condition, newScope).value) {
      if (node.body) {
        let bodyScope = newScope.getChildScope("while");
        result = this.engine.visit(node.body, bodyScope);
        if (result) {
          value = result.value;
        }
        if (result.output) {
          output += result.output;
        }
      }
    }
    return {
      value,
      output,
    };
  }
}
