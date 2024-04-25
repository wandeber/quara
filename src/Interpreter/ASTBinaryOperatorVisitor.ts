import ASTBinaryOperator from "../ASTNodes/ASTBinaryOperator";
import ASTVisitor from "./ASTVisitor";
import TokenTypes from "../TokenTypes";
import {IASTWithName} from "../ASTNodes/AST";
import {IVisitorResult} from "./VisitorResult";

function repeatString(str: string, num: number): string {
  return new Array(num + 1).join(str);
}

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
    case TokenTypes.OpTimes:
      if (typeof leftValue === "string" && typeof rightValue === "number") {
        result = repeatString(leftValue, rightValue);
      }
      else if (typeof rightValue === "string" && typeof leftValue === "number") {
        result = repeatString(rightValue, leftValue);
      }
      else {
        result = leftValue * rightValue;
      }
      break;
    case TokenTypes.OpDiv:
      result = leftValue / rightValue;
      break;
    case TokenTypes.OpMod:
      result = leftValue % rightValue;
      break;
    case TokenTypes.OpPow:
      result = leftValue ** rightValue;
      break;

    case TokenTypes.OpEq:
      result = leftValue === rightValue;
      break;
    case TokenTypes.OpLaxEq:
      result = leftValue == rightValue;
      break;
    case TokenTypes.OpNEQ:
      result = leftValue !== rightValue;
      break;
    case TokenTypes.OpLaxNEQ:
      result = leftValue != rightValue;
      break;
    case TokenTypes.OpLT:
      result = leftValue < rightValue;
      break;
    case TokenTypes.OpGT:
      result = leftValue > rightValue;
      break;
    case TokenTypes.OpLTE:
      result = leftValue <= rightValue;
      break;
    case TokenTypes.OpGTE:
      result = leftValue >= rightValue;
      break;

    case TokenTypes.OpAnd:
      result = leftValue && rightValue;
      break;
    case TokenTypes.OpOr:
      result = leftValue || rightValue;
      break;

    case TokenTypes.OpIn:
      if (typeof rightValue === "string" || Array.isArray(rightValue)) {
        result = rightValue.includes(leftValue);
      }
      else if (typeof rightValue === "object") {
        result = rightValue.hasOwnProperty(leftValue);
      }
      else {
        this.interpreter.error(rightValue +" is not an array, string, or object.");
      }
      break;

    case TokenTypes.OpInclRange:
    case TokenTypes.OpExclRange:
      let right = node.operator.type === TokenTypes.OpInclRange ? rightValue + 1 : rightValue;
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
    case TokenTypes.CurlyOpen:
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
    case TokenTypes.ArrAccessOpen:
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
