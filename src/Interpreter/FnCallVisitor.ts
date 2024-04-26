import {INode} from "../ASTNodes/ASTNode";
import {FnCall} from "../ASTNodes/FnCall";
import {ASTVisitor} from "./ASTVisitor";
import {IVisitorResult} from "./VisitorResult";



export class FnCallVisitor extends ASTVisitor {
  visit(node: FnCall): IVisitorResult {
    let result;
    let args = node.right.map((nodeItem: INode) =>
      // nodeItem.accept(this.interpreter)
      this.interpreter.visit(nodeItem).value,
    );
    // let func = node.left.accept(this.interpreter);
    let func = this.interpreter.visit(node.left).value as any;
    result = func(...args);
    // console.log("result", result);
    return {
      value: result,
      output: String(result),
    };
  }
}
