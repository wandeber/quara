import {Variable} from "../ASTNodes/Variable";
import {ASTVisitor} from "./ASTVisitor";
import {IVisitorResult} from "./VisitorResult";



export class VariableVisitor extends ASTVisitor {
  visit(node: Variable): IVisitorResult {
    let value, output;
    if (this.interpreter.globalScope.hasOwnProperty(node.name)) {
      value = this.interpreter.globalScope[node.name];
      output = String(value);
    }
    return {
      value,
      output,
    };
  }
}
