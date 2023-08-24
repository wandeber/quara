import ASTBinaryOperator from "../ASTNodes/ASTBinaryOperator";
import ASTVisitor from "./ASTVisitor";
import TokenTypes from "../TokenTypes";



export default class ASTBinaryOperatorVisitor extends ASTVisitor {
  visit(node: ASTBinaryOperator) {
    let result, left, right;

    switch (node.operator.type) {
    case TokenTypes.OpPlus:
      result = node.left.visit(this.interpreter) + node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpMinus:
      result = node.left.visit(this.interpreter) - node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpMultiplication:
      result = node.left.visit(this.interpreter) * node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpDivision:
      result = node.left.visit(this.interpreter) / node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpModulus:
      result = node.left.visit(this.interpreter) % node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpPow:
      result = node.left.visit(this.interpreter) ** node.right.visit(this.interpreter);
      break;

    case TokenTypes.OpEqual:
      result = node.left.visit(this.interpreter) === node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpLaxEqual:
      result = node.left.visit(this.interpreter) == node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpNotEqual:
      result = node.left.visit(this.interpreter) !== node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpLaxNotEqual:
      result = node.left.visit(this.interpreter) != node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpLowerThan:
      result = node.left.visit(this.interpreter) < node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpGreaterThan:
      result = node.left.visit(this.interpreter) > node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpLowerThanEqual:
      result = node.left.visit(this.interpreter) <= node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpGreaterThanEqual:
      result = node.left.visit(this.interpreter) >= node.right.visit(this.interpreter);
      break;

    case TokenTypes.OpAnd:
      result = node.left.visit(this.interpreter) && node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpOr:
      result = node.left.visit(this.interpreter) || node.right.visit(this.interpreter);
      break;

    case TokenTypes.OpDot:
      left = node.left.visit(this.interpreter);
      if (
        typeof left !== "undefined"
        && typeof node.right.name !== "undefined"
        && typeof left[node.right.name] !== "function"
      ) {
        result = left[node.right.name];
      }
      break;
    case TokenTypes.OpArrayAccessorOpen:
      left = node.left.visit(this.interpreter);
      right = node.right.visit(this.interpreter);
      if (typeof left !== "undefined" && typeof left[right] !== "function") {
        result = left[right];
      }
      break;

    default: break;
    }

    if (result === -0) {
      result = 0;
    }

    return result;
  }
}
