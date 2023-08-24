import ASTUnaryOperator from "../ASTNodes/ASTUnaryOperator";
import ASTVisitor from "./ASTVisitor";
import TokenTypes from "../TokenTypes";



export default class ASTUnaryOperatorVisitor extends ASTVisitor {
  visit(node: ASTUnaryOperator) {
    let result;

    if (node.operator.type == TokenTypes.OpPlus) {
      result = node.expr.visit(this.interpreter);
    }
    else if (node.operator.type == TokenTypes.OpMinus) {
      result = -node.expr.visit(this.interpreter);
    }
    else if (node.operator.type == TokenTypes.OpNot) {
      result = !node.expr.visit(this.interpreter);
    }
    else if (node.operator.type == TokenTypes.OpSqrt) {
      result = Math.sqrt(node.expr.visit(this.interpreter));
    }

    if (result === -0) {
      result = 0;
    }

    return result;
  }
}
