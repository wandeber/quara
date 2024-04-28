import {Variable} from "../ASTNodes/Variable";
import {ASTVisitor} from "./ASTInterpreter";
import {Scope} from "./Scope";
import {IVisitorResult} from "./VisitorResult";



export class VariableVisitor extends ASTVisitor {
  visit(node: Variable, scope: Scope): IVisitorResult {
    let value, output;
    let member = scope.lookup(node.name);
    if (typeof member !== "undefined") {
      value = member.value;
      output = String(value);
    }
    return {
      value,
      output,
    };
  }
}
