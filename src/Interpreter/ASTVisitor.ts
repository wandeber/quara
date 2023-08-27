import {IASTInterpreter} from "./ASTInterpreter";
import AST, {IAST, IASTWithValue} from "../ASTNodes/AST";

export interface IASTVisitor {
  interpreter: IASTInterpreter;
  visit(node: AST): any;
}

export default class ASTVisitor implements IASTVisitor {
  public interpreter: IASTInterpreter;

  constructor(interpreter: IASTInterpreter) {
    this.interpreter = interpreter;
  }

  visit(node: IAST|IASTWithValue) {
    // return node.accept(this);
    // this.interpreter.visit(node);
    return (node as IASTWithValue).value;
  }
}
