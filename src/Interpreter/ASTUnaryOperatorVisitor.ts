import ASTUnaryOperator from "../ASTNodes/ASTUnaryOperator";
import ASTVisitor from "./ASTVisitor";
import TokenTypes from "../TokenTypes";



export default class ASTUnaryOperatorVisitor extends ASTVisitor {
  visit(node: ASTUnaryOperator) {
    let result;

    let exprValue = node.expr.accept(this.interpreter);
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
      result = exprValue + 1;
    }
    else if (node.operator.type == TokenTypes.OpDecrement) {
      result = exprValue - 1;
    }

    if (result === -0) {
      result = 0;
    }

    return result;
  }
}
