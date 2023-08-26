import ASTBinaryOperator from "../ASTNodes/ASTBinaryOperator";
import ASTVisitor from "./ASTVisitor";
import TokenTypes from "../TokenTypes";
import {IASTWithName} from "../ASTNodes/AST";



export default class ASTBinaryOperatorVisitor extends ASTVisitor {
  visit(node: ASTBinaryOperator) {
    let result;

    // let leftValue = node.left?.accept(this.interpreter);
    // let rightValue = node.right?.accept(this.interpreter);
    let leftValue = this.interpreter.visit(node.left);
    let rightValue = this.interpreter.visit(node.right);

    switch (node.operator.type) {
    case TokenTypes.OpPlus:
      result = leftValue + rightValue;
      break;
    case TokenTypes.OpMinus:
      result = leftValue - rightValue;
      break;
    case TokenTypes.OpMultiplication:
      result = leftValue * rightValue;
      break;
    case TokenTypes.OpDivision:
      result = leftValue / rightValue;
      break;
    case TokenTypes.OpModulus:
      result = leftValue % rightValue;
      break;
    case TokenTypes.OpPow:
      result = leftValue ** rightValue;
      break;

    case TokenTypes.OpEqual:
      result = leftValue === rightValue;
      break;
    case TokenTypes.OpLaxEqual:
      result = leftValue == rightValue;
      break;
    case TokenTypes.OpNotEqual:
      result = leftValue !== rightValue;
      break;
    case TokenTypes.OpLaxNotEqual:
      result = leftValue != rightValue;
      break;
    case TokenTypes.OpLowerThan:
      result = leftValue < rightValue;
      break;
    case TokenTypes.OpGreaterThan:
      result = leftValue > rightValue;
      break;
    case TokenTypes.OpLowerThanEqual:
      result = leftValue <= rightValue;
      break;
    case TokenTypes.OpGreaterThanEqual:
      result = leftValue >= rightValue;
      break;

    case TokenTypes.OpAnd:
      result = leftValue && rightValue;
      break;
    case TokenTypes.OpOr:
      result = leftValue || rightValue;
      break;

    case TokenTypes.OpDot:
      let {name} = node.right as IASTWithName;
      if (
        typeof leftValue !== "undefined"
        && typeof name !== "undefined"
        && leftValue.hasOwnProperty(name)
        && typeof leftValue[name] !== "function"
      ) {
        result = leftValue[name];
      }
      break;
    case TokenTypes.OpArrayAccessorOpen:
      if (
        typeof leftValue !== "undefined"
        && leftValue.hasOwnProperty(rightValue)
        && typeof leftValue[rightValue] !== "function"
      ) {
        result = leftValue[rightValue];
      }
      break;
    }

    if (result === -0) {
      result = 0;
    }

    return result;
  }
}
