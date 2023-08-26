import ASTVariable from "../ASTNodes/ASTVariable";
import ASTVisitor from "./ASTVisitor";



export default class ASTVariableVisitor extends ASTVisitor {
  visit(node: ASTVariable) {
    if (this.interpreter.globalScope.hasOwnProperty(node.name)) {
      return this.interpreter.globalScope[node.name];
    }
  }
}
