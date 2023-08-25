import {IASTNode} from "../ASTNodes/AST";
import ASTFunctionCall from "../ASTNodes/ASTFunctionCall";
import ASTVisitor from "./ASTVisitor";



export default class ASTFunctionCallVisitor extends ASTVisitor {
  visit(node: ASTFunctionCall) {
    let result;
    let args = node.right.map((nodeItem: IASTNode) =>
      // nodeItem.accept(this.interpreter)
      this.interpreter.visit(nodeItem),
    );
    // let func = node.left.accept(this.interpreter);
    let func = this.interpreter.visit(node.left);
    result = func(...args);
    return result;
  }
}
