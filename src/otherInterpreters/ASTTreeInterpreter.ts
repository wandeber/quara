

import {IASTVisitor} from "../Interpreter/ASTVisitor";
import ASTInterpreter from "../Interpreter/ASTInterpreter";
// import TokenTypes from "../Token";
import Parser from "../Parser";
import AST from "../ASTNodes/AST";





/**
 *
 */
export default class ASTTreeInterpreter extends ASTInterpreter {
  parser: Parser;

  globalScope: any = {};

  showDebug: boolean;
  visitors: Map<string, IASTVisitor> = new Map();

  space: string = "";

  constructor(parser: Parser, variables = {}, showDebug = false) {
    super();
    this.parser = parser;
    this.showDebug = showDebug;
    Object.assign(this.globalScope, variables);
    this.space = "";
  }


  /*
  visit_ASTBinaryOperator(node) {
    let result,
        prevSpace = this.space;

    this.space += "    ";
    console.log(this.space, "("+ node.operator.value +")");

    switch (node.operator.type) {
    case TokenTypes.OpPlus:
      result = this.visit(node.left) + this.visit(node.right);
      break;
    case TokenTypes.OpMinus:
      result = this.visit(node.left) - this.visit(node.right);
      break;
    case TokenTypes.OpMultiplication:
      result = this.visit(node.left) * this.visit(node.right);
      break;
    case TokenTypes.OpDivision:
      result = this.visit(node.left) / this.visit(node.right);
      break;
    case TokenTypes.OpModulus:
      result = this.visit(node.left) % this.visit(node.right);
      break;

    case TokenTypes.OpEqual:
      result = this.visit(node.left) === this.visit(node.right);
      break;
    case TokenTypes.OpNotEqual:
      result = this.visit(node.left) !== this.visit(node.right);
      break;
    case TokenTypes.OpLowerThan:
      result = this.visit(node.left) < this.visit(node.right);
      break;
    case TokenTypes.OpGreaterThan:
      result = this.visit(node.left) > this.visit(node.right);
      break;
    case TokenTypes.OpLowerThanEqual:
      result = this.visit(node.left) <= this.visit(node.right);
      break;
    case TokenTypes.OpGreaterThanEqual:
      result = this.visit(node.left) >= this.visit(node.right);
      break;

    case TokenTypes.OpAnd:
      result = this.visit(node.left) && this.visit(node.right);
      break;
    case TokenTypes.OpOr:
      result = this.visit(node.left) || this.visit(node.right);
      break;

    default: break;
    }

    this.space = prevSpace;

    return result;
  }

  visit_ASTUnaryOperator(node) {
    let result;

    let prevSpace = this.space;
    this.space += "    ";
    console.log(this.space, "Unary ("+ node.operator.value +")");

    if (node.operator.type == TokenTypes.OpPlus) {
      result = this.visit(node.expr);
    }
    else if (node.operator.type == TokenTypes.OpMinus) {
      result = -this.visit(node.expr);
    }
    else if (node.operator.type == TokenTypes.OpNot) {
      result = !this.visit(node.expr);
    }

    //console.log(this.space, result);
    this.space = prevSpace;

    return result;
  }


  visit_ASTNumber(node) {
    let prevSpace = this.space;
    this.space += "    ";
    console.log(this.space, node.value);
    this.space = prevSpace;

    return node.value;
  }
  */

  visit(node: AST): any {
    this.space += "    ";
    console.log(this.space, node);
    return node.accept(this);
  }


  interpret() {
    let tree = this.parser.parse();
    return tree.accept(this);
  }
}
