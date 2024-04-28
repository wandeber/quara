import {Variable} from "../ASTNodes/Variable";
import {ASTVisitor} from "./ASTInterpreter";
import {IVisitorResult} from "./VisitorResult";



export class VariableVisitor extends ASTVisitor {
  visit(node: Variable): IVisitorResult {
    let value, output;
    if (this.engine.globalScope.hasOwnProperty(node.name)) {
      value = this.engine.globalScope[node.name];
      output = String(value);
    }
    return {
      value,
      output,
    };
  }
}
