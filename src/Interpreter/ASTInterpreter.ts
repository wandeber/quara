import ASTVisitor, {IASTVisitor} from "./ASTVisitor";
import AST from "../ASTNodes/AST";
import Interpreter from "./Interpreter";
import {IVisitorResult} from "./VisitorResult";


export interface IASTInterpreter extends IASTVisitor {
  interpreter: Interpreter;
  globalScope: any;
  error(message: string, me?: any): void;
  debug(message?: string): void;
  visit(node: AST): any;
}

export default abstract class ASTInterpreter implements IASTInterpreter {
  public interpreter: Interpreter;
  globalScope: any = {};
  visitors: Map<string, ASTVisitor> = new Map();

  registerVisitor(nodeNameOrVisitor: string|IASTVisitor, visitor?: IASTVisitor) {
    if (typeof nodeNameOrVisitor !== "string") {
      visitor = nodeNameOrVisitor;
      nodeNameOrVisitor = visitor.constructor.name;
    }
    this.visitors.set(nodeNameOrVisitor, visitor);
  }

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
