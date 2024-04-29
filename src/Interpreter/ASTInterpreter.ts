import {IASTEngine, ASTVisitor as BaseASTVisitor, VisitorMap} from "../ASTVisitor";
import {INode, INodeWithValue, Node} from "../ASTNodes/ASTNode";
import {Compound} from "../ASTNodes/Compound";
import {IVisitorResult} from "./VisitorResult";
import { Scope } from './Scope';


export interface IASTInterpreter extends IASTEngine {
  globalScope: Scope;
  visit(node: Node, scope: Scope): IVisitorResult;
}

export class ASTVisitor extends BaseASTVisitor {
  declare public engine: IASTInterpreter;

  visit(node: INode|INodeWithValue, ...args: any): IVisitorResult {
    return {
      value: (node as INodeWithValue).value,
      output: String((node as INodeWithValue).value),
    };
  }
}

export abstract class ASTInterpreter implements IASTInterpreter {
  globalScope = new Scope();
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

  abstract visit(node: Node, scope: Scope): IVisitorResult;
  abstract process(astTree?: Compound): any;
}
