import {UnaryOperator} from "../ASTNodes/UnaryOperator";
import {ASTVisitor} from "../ASTVisitor";



export class UnaryOperatorVisitor extends ASTVisitor {
  visit(node: UnaryOperator) {
    console.log("UnaryOperatorVisitor", node);
  }
}
