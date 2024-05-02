import {FnDecl} from "../ASTNodes/FnDecl";
import {ASTVisitor} from "./ASTInterpreter";
import {Scope} from "./Scope";
import {IVisitorResult} from "./VisitorResult";



export class FnDeclVisitor extends ASTVisitor {
  visit(node: FnDecl, scope: Scope): IVisitorResult {
    let fn = (...args: any[]) => {
      // console.log("Calling function", node.name.name);
      let newScope = scope.getChildScope(node.name.name);
      for (let i = 0; i < node.params.length; i++) {
        newScope.insert(node.params[i].name, args[i]);
      }
      let result;
      for (let child of node.body.children) {
        result = this.engine.visit(child, newScope);
        if (result.return) {
          break;
        }
      }
      // newScope = undefined;
      return result.value;
    };
    scope.insert(node.name.name, fn, undefined, false, node.params);
    // let type = "any"; // Default any or deduce from value?
    // if (node.nodeType) {
    //   type = this.interpreter.visit(node.nodeType);
    // }
    // console.log("Type: ", type);

    return {
      value: undefined,
      //value: fn ? fn : undefined,
      output: undefined,
    };
  }
}
