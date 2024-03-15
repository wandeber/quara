import ASTWhile from "../ASTNodes/ASTWhile";
import ASTVisitor from "./ASTVisitor";
import {IVisitorResult} from "./VisitorResult";



export default class ASTIfVisitor extends ASTVisitor {
  visit(node: ASTWhile): IVisitorResult {
    let result, value;
    let output = "";
    while (this.interpreter.visit(node.condition).value) {
      if (node.body) {
        result = this.interpreter.visit(node.body);
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
