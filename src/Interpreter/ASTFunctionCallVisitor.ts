import {IAST} from "../ASTNodes/AST";
import ASTFunctionCall from "../ASTNodes/ASTFunctionCall";
import ASTVisitor from "./ASTVisitor";
import {IVisitorResult} from "./VisitorResult";



export default class ASTFunctionCallVisitor extends ASTVisitor {
  visit(node: ASTFunctionCall): IVisitorResult {
    let result;
    let args = node.right.map((nodeItem: IAST) =>
      // nodeItem.accept(this.interpreter)
      this.interpreter.visit(nodeItem).value,
    );
    // let func = node.left.accept(this.interpreter);
    let func = this.interpreter.visit(node.left).value;
    result = func(...args);
    console.log("result", result);
    return {
      value: result,
      output: String(result),
    };
  }
}
