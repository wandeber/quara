import {INode} from "../ASTNodes/ASTNode";
import {FnCall} from "../ASTNodes/FnCall";
import {ASTVisitor} from "./ASTInterpreter";
import {Scope} from "./Scope";
import {IVisitorResult} from "./VisitorResult";



export class FnCallVisitor extends ASTVisitor {
  visit(node: FnCall, scope: Scope): IVisitorResult {
    let result;
    let args = node.right.map((nodeItem: INode) =>
      // nodeItem.accept(this.interpreter)
      this.engine.visit(nodeItem, scope).value,
    );
    // let func = node.left.accept(this.interpreter);
    let func = this.engine.visit(node.left, scope).value as any;
    result = func(...args);
    // console.log("result", result);
    return {
      value: result,
      output: String(result),
    };
  }
}
