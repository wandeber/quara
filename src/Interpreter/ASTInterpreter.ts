import ASTVisitor, {IASTVisitor} from "./ASTVisitor";
import AST from "../ASTNodes/AST";
import Interpreter from "./Interpreter";




export default abstract class ASTInterpreter implements IASTVisitor {
  public interpreter: Interpreter;
  globalScope: any = {};
  visitors: Map<string, ASTVisitor> = new Map();

  registerVisitor(nodeNameOrVisitor: string|ASTVisitor, visitor: ASTVisitor) {
    this.visitors.set(visitor.constructor.name, visitor);
  }

  abstract visit(node: AST): any;
  abstract interpret(): any;
  error(message: string, me: any) {
    if (message) {
      console.log(message, me);
    }
    throw new Error("Ivalid syntax.");
  }
  debug(message = "") {
    console.log("-- Interpreter: "+ message);
  }
}
