import {BinOperator} from "../ASTNodes/BinOperator";
import {ASTVisitor} from "./ASTInterpreter";
import {TT} from "../TokenTypes";
import {INodeWithName} from "../ASTNodes/ASTNode";
import {IVisitorResult} from "./VisitorResult";
import {Scope} from "./Scope";

function repeatString(str: string, num: number): string {
  return new Array(num + 1).join(str);
}

export class BinOperatorVisitor extends ASTVisitor {
  visit(node: BinOperator, scope: Scope): IVisitorResult {
    let result, rightValue;

    // let leftValue = node.left?.accept(this.interpreter);
    // let rightValue = node.right?.accept(this.interpreter);
    let leftResult = this.engine.visit(node.left, scope) as any;
    let rightResult = this.engine.visit(node.right, scope) as any;

    let leftValue = leftResult.value;
    if (typeof rightResult !== "undefined") {
      rightValue = rightResult.value;
    }

    switch (node.operator.type) {
    case TT.OpPlus:
      result = leftValue + rightValue;
      break;
    case TT.OpMinus:
      result = leftValue - rightValue;
      break;
    case TT.OpTimes:
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
    case TT.OpDiv:
      result = leftValue / rightValue;
      break;
    case TT.OpMod:
      result = leftValue % rightValue;
      break;
    case TT.OpPow:
      result = leftValue ** rightValue;
      break;

    case TT.OpEq:
      result = leftValue === rightValue;
      break;
    case TT.OpLaxEq:
      result = leftValue == rightValue;
      break;
    case TT.OpNEq:
      result = leftValue !== rightValue;
      break;
    case TT.OpLaxNEq:
      result = leftValue != rightValue;
      break;
    case TT.OpLT:
      result = leftValue < rightValue;
      break;
    case TT.OpGT:
      result = leftValue > rightValue;
      break;
    case TT.OpLTE:
      result = leftValue <= rightValue;
      break;
    case TT.OpGTE:
      result = leftValue >= rightValue;
      break;

    case TT.OpAnd:
      result = leftValue && rightValue;
      break;
    case TT.OpOr:
      result = leftValue || rightValue;
      break;

    case TT.OpIn:
      if (typeof rightValue === "string" || Array.isArray(rightValue)) {
        result = rightValue.includes(leftValue);
      }
      else if (typeof rightValue === "object") {
        result = rightValue.hasOwnProperty(leftValue);
      }
      else {
        this.engine.error(rightValue +" is not an array, string, or object.");
      }
      break;

    case TT.OpInclRange:
    case TT.OpExclRange:
      let right = node.operator.type === TT.OpInclRange ? rightValue + 1 : rightValue;
      result = [];
      for (let i = leftValue; i < right; i++) {
        result.push(i);
      }
      break;

    case TT.Dot:
      let {name} = node.right as INodeWithName;
      if (
        typeof leftValue !== "undefined"
        && typeof name !== "undefined"
        && leftValue.hasOwnProperty(name)
        && typeof leftValue[name] !== "function"
      ) {
        result = leftValue[name];
      }
      break;
    case TT.CurlyOpen:
      if (typeof leftValue !== "object"/* || Array.isArray(leftValue)*/) {
        this.engine.error(leftValue +" is not an object.");
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
    case TT.BracketOpen:
      if (!Array.isArray(leftValue)) {
        this.engine.error(leftValue +" is not an array.");
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
