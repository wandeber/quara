import AST from "../ASTNodes/AST";
import Interpreter from "./Interpreter";



export interface IASTVisitor {
  visit(node: AST): any;
}

export default abstract class ASTVisitor implements IASTVisitor {
  public interpreter: Interpreter;

  constructor(interpreter: Interpreter) {
    this.interpreter = interpreter;
  }

  abstract visit(node: AST): any;
}
