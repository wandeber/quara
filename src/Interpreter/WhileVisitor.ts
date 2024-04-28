import {While} from "../ASTNodes/While";
import {ASTVisitor} from "./ASTInterpreter";
import {IVisitorResult} from "./VisitorResult";



export class WhileVisitor extends ASTVisitor {
  visit(node: While): IVisitorResult {
    let result, value;
    let output = "";
    while (this.engine.visit(node.condition).value) {
      if (node.body) {
        result = this.engine.visit(node.body);
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
