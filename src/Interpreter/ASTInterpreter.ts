import {IASTEngine, IASTVisitor, VisitorMap} from "../ASTVisitor";
import {INode, INodeWithValue, Node} from "../ASTNodes/ASTNode";
import {IVisitorResult} from "./VisitorResult";


export interface IASTInterpreter extends IASTEngine {
  globalScope: any;
  visit(node: Node): IVisitorResult;
}

export class ASTVisitor implements IASTVisitor {
  public engine: IASTInterpreter;

  constructor(engine: IASTInterpreter) {
    this.engine = engine;
  }

  visit(node: INode|INodeWithValue): IVisitorResult {
    return {
      value: (node as INodeWithValue).value,
      output: String((node as INodeWithValue).value),
    };
  }
}

export abstract class ASTInterpreter implements IASTInterpreter {
  globalScope: any = {};
  visitors: VisitorMap = {};

  error(message: string, me?: any) {
    if (message) {
      console.log(message, me);
    }
    throw new Error("Error during execution.");
  }

  debug(message = "") {
    console.log("-- Interpreter: "+ message);
  }

  abstract visit(node: Node): IVisitorResult;
  abstract process(): any;
}
