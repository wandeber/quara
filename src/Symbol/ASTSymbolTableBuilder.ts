// import {ASTVisitor} from "./ASTVisitor";
import {VisitorMap} from "../Interpreter/ASTInterpreter";
import {Node} from "../ASTNodes/ASTNode";




export interface IASTInterpreter {
  globalScope: any;
  error(message: string, me?: any): void;
  debug(message?: string): void;
  visit(node: Node): any;
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

  abstract visit(node: Node): any;
  abstract interpret(): any;
}
