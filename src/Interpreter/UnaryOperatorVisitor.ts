import {UnaryOperator} from "../ASTNodes/UnaryOperator";
import {ASTVisitor} from "./ASTVisitor";
import {TT} from "../TokenTypes";
import {INodeWithName} from "../ASTNodes/ASTNode";
import {IVisitorResult} from "./VisitorResult";



export class UnaryOperatorVisitor extends ASTVisitor {
  visit(node: UnaryOperator): IVisitorResult {
    let result, exprValue;

    // let exprValue = node.expr.accept(this.interpreter);
    let exprResult = this.interpreter.visit(node.expr) as any;

    if (exprResult) {
      exprValue = exprResult.value;
    }

    if (node.operator.type == TT.OpPlus) {
      result = exprValue;
    }
    else if (node.operator.type == TT.OpMinus) {
      result = -exprValue;
    }
    else if (node.operator.type == TT.OpNot) {
      result = !exprValue;
    }
    else if (node.operator.type == TT.OpSqrt) {
      result = Math.sqrt(exprValue);
    }
    else if (node.operator.type == TT.OpIncr) {
      let name = (node.expr as INodeWithName).name;
      result = exprValue + 1;
      this.interpreter.globalScope[name] = result;
    }
    else if (node.operator.type == TT.OpDecr) {
      let name = (node.expr as INodeWithName).name;
      result = exprValue - 1;
      this.interpreter.globalScope[name] = result;
    }

    return {
      value: result,
      output: String(result),
    };
  }
}
