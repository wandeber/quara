import ASTVariable from "../ASTNodes/ASTVariable";
import ASTVisitor from "./ASTVisitor";
import {IVisitorResult} from "./VisitorResult";



export default class ASTVariableVisitor extends ASTVisitor {
  visit(node: ASTVariable): IVisitorResult {
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
