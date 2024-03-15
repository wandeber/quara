import ASTVisitor from "./ASTVisitor";
import AST from "../ASTNodes/AST";
import {IVisitorResult} from "./VisitorResult";


interface VisitorMap {
  [key: string]: ASTVisitor;
}

export interface IASTInterpreter {
  globalScope: any;
  error(message: string, me?: any): void;
  debug(message?: string): void;
  visit(node: AST): IVisitorResult;
}

export default abstract class ASTInterpreter implements IASTInterpreter {
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

  abstract visit(node: AST): IVisitorResult;
  abstract interpret(): any;
}
