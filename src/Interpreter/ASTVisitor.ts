import {IASTInterpreter} from "./ASTInterpreter";
import {Node, INode, INodeWithValue} from "../ASTNodes/ASTNode";
import {IVisitorResult} from "./VisitorResult";

export interface IASTVisitor {
  interpreter: IASTInterpreter;
  visit(node: Node): IVisitorResult;
}

export class ASTVisitor implements IASTVisitor {
  public interpreter: IASTInterpreter;

  constructor(interpreter: IASTInterpreter) {
    this.interpreter = interpreter;
  }

  visit(node: INode|INodeWithValue): IVisitorResult {
    return {
      value: (node as INodeWithValue).value,
      output: String((node as INodeWithValue).value),
    };
  }
}
