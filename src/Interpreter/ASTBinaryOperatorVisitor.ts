import ASTBinaryOperator from "../ASTNodes/ASTBinaryOperator";
import ASTVisitor from "./ASTVisitor";
import TokenTypes from "../TokenTypes";
import {IASTWithName} from "../ASTNodes/AST";
import {IVisitorResult} from "./VisitorResult";



export default class ASTBinaryOperatorVisitor extends ASTVisitor {
  visit(node: ASTBinaryOperator): IVisitorResult {
    let result, rightValue;

    // let leftValue = node.left?.accept(this.interpreter);
    // let rightValue = node.right?.accept(this.interpreter);
    let leftResult = this.interpreter.visit(node.left) as any;
    let rightResult = this.interpreter.visit(node.right) as any;

    let leftValue = leftResult.value;
    if (typeof rightResult !== "undefined") {
      rightValue = rightResult.value;
    }

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

    case TokenTypes.OpInclusiveRange:
    case TokenTypes.OpExclusiveRange:
      let right = node.operator.type === TokenTypes.OpInclusiveRange ? rightValue + 1 : rightValue;
      result = [];
      for (let i = leftValue; i < right; i++) {
        result.push(i);
      }
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
    case TokenTypes.OpCurlyBraceOpen:
      if (typeof leftValue !== "object"/* || Array.isArray(leftValue)*/) {
        this.interpreter.error(leftValue +" is not an object.");
      }
      if (
        typeof leftValue !== "undefined"
        && leftValue.hasOwnProperty(rightValue)
        && typeof leftValue[rightValue] !== "function"
        // && !Array.isArray(leftValue)
      ) {
        result = leftValue[rightValue];
      }
      break;
    case TokenTypes.OpArrayAccessorOpen:
      if (!Array.isArray(leftValue)) {
        this.interpreter.error(leftValue +" is not an array.");
      }
      if (
        typeof leftValue !== "undefined"
        && leftValue.hasOwnProperty(rightValue)
        && typeof leftValue[rightValue] !== "function"
      ) {
        result = leftValue[rightValue];
      }
      break;
    }

    return {
      value: result,
      output: result,
    };
  }
}
