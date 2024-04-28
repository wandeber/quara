import {BinOperator} from "../ASTNodes/BinOperator";
import {ASTVisitor} from "../ASTVisitor";

export class BinOperatorVisitor extends ASTVisitor {
  visit(node: BinOperator) {
    console.log("BinOperatorVisitor", node);
    this.engine.visit(node.left);
    this.engine.visit(node.right);
  }
}
