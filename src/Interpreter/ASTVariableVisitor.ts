import ASTVariable from "../ASTNodes/ASTVariable";
import ASTVisitor from "./ASTVisitor";
import {IVisitorResult} from "./VisitorResult";



export default class ASTVariableVisitor extends ASTVisitor {
  visit(node: ASTVariable): IVisitorResult {
    if (this.interpreter.globalScope.hasOwnProperty(node.name)) {
      return {
        value: this.interpreter.globalScope[node.name],
        output: this.interpreter.globalScope[node.name],
      };
    }
  }
}
