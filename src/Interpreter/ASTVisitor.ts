import ASTInterpreter from "./ASTInterpreter";
import AST from "../ASTNodes/AST";

export interface IASTVisitor {
  interpreter: ASTInterpreter;
  visit(node: AST): any;
}

export default class ASTVisitor implements IASTVisitor {
  public interpreter: ASTInterpreter;

  constructor(interpreter: ASTInterpreter) {
    this.interpreter = interpreter;
  }

  visit(node: AST) {
    return node.visit(this);
  }
}
