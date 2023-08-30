import {IASTInterpreter} from "./ASTInterpreter";
import AST, {IAST, IASTWithValue} from "../ASTNodes/AST";
import {IVisitorResult} from "./VisitorResult";

export interface IASTVisitor {
  interpreter: IASTInterpreter;
  visit(node: AST): IVisitorResult;
}

export default class ASTVisitor implements IASTVisitor {
  public interpreter: IASTInterpreter;

  constructor(interpreter: IASTInterpreter) {
    this.interpreter = interpreter;
  }

  visit(node: IAST|IASTWithValue): IVisitorResult {
    return {
      value: (node as IASTWithValue).value,
      output: String((node as IASTWithValue).value),
    };
  }
}
