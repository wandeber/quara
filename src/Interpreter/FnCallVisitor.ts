import {INode} from "../ASTNodes/ASTNode";
import {FnCall} from "../ASTNodes/FnCall";
import {ASTVisitor} from "./ASTInterpreter";
import {Scope} from "./Scope";
import {IVisitorResult} from "./VisitorResult";



export class FnCallVisitor extends ASTVisitor {
  visit(node: FnCall, scope: Scope): IVisitorResult {
    let result;
    let newScope = scope.getChildScope("fnCall");
    let args = node.right.map((nodeItem: INode) =>
      // nodeItem.accept(this.interpreter)
      this.engine.visit(nodeItem, newScope).value,
    );
    let func = this.engine.visit(node.left, newScope).value as any;
    result = func(...args);
    return {
      value: result,
      output: String(result),
    };
  }
}
