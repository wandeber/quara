import ASTFunctionCall from "../ASTNodes/ASTFunctionCall";
import ASTVisitor from "./ASTVisitor";



export default class ASTFunctionCallVisitor extends ASTVisitor {
  visit(node: ASTFunctionCall) {
    let result;
    let args = node.right.map((nodeItem: any) => nodeItem.visit(this.interpreter));
    let func = node.left.visit(this.interpreter);
    result = func(...args);
    return result;
  }
}
