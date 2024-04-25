import ASTUnaryOperator from "../ASTNodes/ASTUnaryOperator";
import ASTVisitor from "./ASTVisitor";
import TokenTypes from "../TokenTypes";
import {IASTWithName} from "../ASTNodes/AST";
import {IVisitorResult} from "./VisitorResult";



export default class ASTUnaryOperatorVisitor extends ASTVisitor {
  visit(node: ASTUnaryOperator): IVisitorResult {
    let result, exprValue;

    // let exprValue = node.expr.accept(this.interpreter);
    let exprResult = this.interpreter.visit(node.expr) as any;

    if (exprResult) {
      exprValue = exprResult.value;
    }

    if (node.operator.type == TokenTypes.OpPlus) {
      result = exprValue;
    }
    else if (node.operator.type == TokenTypes.OpMinus) {
      result = -exprValue;
    }
    else if (node.operator.type == TokenTypes.OpNot) {
      result = !exprValue;
    }
    else if (node.operator.type == TokenTypes.OpSqrt) {
      result = Math.sqrt(exprValue);
    }
    else if (node.operator.type == TokenTypes.OpIncr) {
      let name = (node.expr as IASTWithName).name;
      result = exprValue + 1;
      this.interpreter.globalScope[name] = result;
    }
    else if (node.operator.type == TokenTypes.OpDecr) {
      let name = (node.expr as IASTWithName).name;
      result = exprValue - 1;
      this.interpreter.globalScope[name] = result;
    }

    return {
      value: result,
      output: String(result),
    };
  }
}
