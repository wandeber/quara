import {Const} from "../ASTNodes/Const";
import {Scope} from "./Scope";
import {VariableVisitor} from "./VariableVisitor";
import {IVisitorResult} from "./VisitorResult";



export class ASTConstVisitor extends VariableVisitor {
  visit(node: Const, scope: Scope): IVisitorResult {
    let value, output;
    if (this.engine.globalScope.hasOwnProperty(node.name)) {
      value = scope.getMemberValue(node.name);
      output = String(value);
    }
    return {
      value,
      output,
    };
  }
}
