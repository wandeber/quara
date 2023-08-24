import ASTAssign from "../ASTNodes/ASTAssign";
import ASTVisitor from "./ASTVisitor";
import TokenTypes from "../TokenTypes";



export default class ASTAssignVisitor extends ASTVisitor {
  visit(node: ASTAssign) {
    if (typeof this.interpreter.globalScope[node.left.name] == "undefined") {
      throw new Error("La variable "+ node.left.name +" no ha sido declarada.");
    }

    let value;
    switch (node.operator.type) {
    case TokenTypes.OpAssign:
      value = node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpPlusAssign:
      value = node.left.visit(this.interpreter) + node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpMinusAssign:
      value = node.left.visit(this.interpreter) - node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpMultiplicationAssign:
      value = node.left.visit(this.interpreter) * node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpDivisionAssign:
      value = node.left.visit(this.interpreter) / node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpModulusAssign:
      value = node.left.visit(this.interpreter) % node.right.visit(this.interpreter);
      break;
    case TokenTypes.OpPowAssign:
      // value = Math.pow(node.left.visit(this.interpreter), node.right.visit(this.interpreter));
      value = node.left.visit(this.interpreter) ** node.right.visit(this.interpreter);
      break;
    default:
      this.interpreter.error("Unknown operator", node.operator);
      break;
    }

    if (value === -0) {
      value = 0;
    }

    this.interpreter.globalScope[node.left.name] = value;
    return this.interpreter.globalScope[node.left.name];
  }
}
