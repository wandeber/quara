import {While} from "../ASTNodes/While";
import {ASTVisitor} from "./ASTInterpreter";
import {IVisitorResult} from "./VisitorResult";
import {Scope} from "./Scope";




export class WhileVisitor extends ASTVisitor {
  visit(node: While, scope: Scope): IVisitorResult {
    let result, value;
    let output = "";
    while (this.engine.visit(node.condition, scope).value) {
      if (node.body) {
        result = this.engine.visit(node.body, scope);
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
