import {Variable} from "../ASTNodes/Variable";
import {ASTVisitor} from "../ASTVisitor";



export class VariableVisitor extends ASTVisitor {
  visit(node: Variable) {
    console.log("VariableVisitor", node);
  }
}
