import ASTInterpreter from "./ASTInterpreter";
import AST, {IASTNode} from "../ASTNodes/AST";

export interface IASTVisitor {
  interpreter: ASTInterpreter;
  visit(node: AST): any;
}

export default class ASTVisitor implements IASTVisitor {
  public interpreter: ASTInterpreter;

  constructor(interpreter: ASTInterpreter) {
    this.interpreter = interpreter;
  }

  visit(node: IASTNode) {
    return node.accept(this);
  }
}
