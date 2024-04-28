import {Const} from "../ASTNodes/Const";
import {VariableVisitor} from "./VariableVisitor";
import {IVisitorResult} from "./VisitorResult";



export class ASTConstVisitor extends VariableVisitor {
  visit(node: Const): IVisitorResult {
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
