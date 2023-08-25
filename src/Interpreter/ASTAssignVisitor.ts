import ASTAssign from "../ASTNodes/ASTAssign";
import ASTVisitor from "./ASTVisitor";
import TokenTypes from "../TokenTypes";
import {IASTWithName} from "../ASTNodes/AST";



export default class ASTAssignVisitor extends ASTVisitor {
  visit(node: ASTAssign) {
    let {name} = node.left as IASTWithName;
    if (typeof this.interpreter.globalScope[name] == "undefined") {
      this.interpreter.error("La variable "+ name +" no ha sido declarada.");
    }

    // let leftValue = node.left?.accept(this.interpreter);
    // let rightValue = node.right?.accept(this.interpreter);
    let leftValue = this.interpreter.visit(node.left);
    let rightValue = this.interpreter.visit(node.right);

    let value;
    switch (node.operator.type) {
    case TokenTypes.OpAssign:
      value = rightValue;
      break;
    case TokenTypes.OpPlusAssign:
      value = leftValue + rightValue;
      break;
    case TokenTypes.OpMinusAssign:
      value = leftValue - rightValue;
      break;
    case TokenTypes.OpMultiplicationAssign:
      value = leftValue * rightValue;
      break;
    case TokenTypes.OpDivisionAssign:
      value = leftValue / rightValue;
      break;
    case TokenTypes.OpModulusAssign:
      value = leftValue % rightValue;
      break;
    case TokenTypes.OpPowAssign:
      value = leftValue ** rightValue;
      break;
    default:
      this.interpreter.error("Unknown operator", node.operator);
      break;
    }

    if (value === -0) {
      value = 0;
    }

    this.interpreter.globalScope[name] = value;
    return this.interpreter.globalScope[name];
  }
}
