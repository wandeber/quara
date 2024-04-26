import {ASTVisitor} from "./ASTVisitor";
import {Node} from "../ASTNodes/ASTNode";
import {IVisitorResult} from "./VisitorResult";


export interface VisitorMap {
  [key: string]: ASTVisitor;
}

export interface IASTInterpreter {
  globalScope: any;
  error(message: string, me?: any): void;
  debug(message?: string): void;
  visit(node: Node): IVisitorResult;
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
  abstract interpret(): any;
}
