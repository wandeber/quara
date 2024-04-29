import {Return} from "../ASTNodes/Return";
import {VarDecl} from "../ASTNodes/VarDecl";
import {ASTVisitor} from "./ASTInterpreter";
import {INodeWithName} from "../ASTNodes/ASTNode";
import {IVisitorResult} from "./VisitorResult";
import {Scope} from "./Scope";



export class ReturnVisitor extends ASTVisitor {
  visit(node: Return, scope: Scope): IVisitorResult {
    // let type = "any"; // Default any or deduce from value?
    // if (node.nodeType) {
    //   type = this.interpreter.visit(node.nodeType);
    // }
    // console.log("Type: ", type);

    let result = this.engine.visit(node.expr, scope);

    return {
      value: result.value,
      output: String(result.value),
      return: true,
    };
  }
}
