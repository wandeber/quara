import {UnaryOperator} from "../ASTNodes/UnaryOperator";
import {ASTVisitor} from "./ASTInterpreter";
import {TT} from "../TokenTypes";
import {INodeWithName} from "../ASTNodes/ASTNode";
import {IVisitorResult} from "./VisitorResult";
import {Scope} from "./Scope";



export class UnaryOperatorVisitor extends ASTVisitor {
  visit(node: UnaryOperator, scope: Scope): IVisitorResult {
    let result, exprValue;

    // let exprValue = node.expr.accept(this.interpreter);
    let exprResult = this.engine.visit(node.expr, scope) as any;

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
      scope.insert(name, result);
    }
    else if (node.operator.type == TT.OpDecr) {
      let name = (node.expr as INodeWithName).name;
      result = exprValue - 1;
      scope.insert(name, result);
    }

    return {
      value: result,
      output: String(result),
    };
  }
}
