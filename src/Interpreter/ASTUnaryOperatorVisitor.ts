import ASTUnaryOperator from "../ASTNodes/ASTUnaryOperator";
import ASTVisitor from "./ASTVisitor";
import TokenTypes from "../TokenTypes";
import {IASTWithName} from "../ASTNodes/AST";



export default class ASTUnaryOperatorVisitor extends ASTVisitor {
  visit(node: ASTUnaryOperator) {
    let result;

    // let exprValue = node.expr.accept(this.interpreter);
    let exprValue = this.interpreter.visit(node.expr);

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
    else if (node.operator.type == TokenTypes.OpIncrement) {
      let name = (node.expr as IASTWithName).name;
      result = exprValue + 1;
      this.interpreter.globalScope[name] = result;
    }
    else if (node.operator.type == TokenTypes.OpDecrement) {
      let name = (node.expr as IASTWithName).name;
      result = exprValue - 1;
      this.interpreter.globalScope[name] = result;
    }

    return result;
  }
}
