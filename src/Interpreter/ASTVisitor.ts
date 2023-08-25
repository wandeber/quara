import ASTInterpreter from "./ASTInterpreter";
import AST, {IASTNode, IASTWithValue} from "../ASTNodes/AST";

export interface IASTVisitor {
  interpreter: ASTInterpreter;
  visit(node: AST): any;
}

export default class ASTVisitor implements IASTVisitor {
  public interpreter: ASTInterpreter;

  constructor(interpreter: ASTInterpreter) {
    this.interpreter = interpreter;
  }

  visit(node: IASTNode|IASTWithValue) {
    // return node.accept(this);
    // this.interpreter.visit(node);
    return (node as IASTWithValue).value;
  }
}
