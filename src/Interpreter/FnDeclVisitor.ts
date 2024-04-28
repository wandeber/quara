import {FnDecl} from "../ASTNodes/FnDecl";
import {ASTVisitor} from "./ASTInterpreter";
import { IVisitorResult } from './VisitorResult';



export class FnDeclVisitor extends ASTVisitor {
  visit(node: FnDecl): IVisitorResult {
    this.engine.globalScope[node.name.name] = () => {
      // console.log("Calling function", node.name.name);
      let result;
      for (let child of node.body.children) {
        result = this.engine.visit(child);
      }
      return result.value;
    };
    // let type = "any"; // Default any or deduce from value?
    // if (node.nodeType) {
    //   type = this.interpreter.visit(node.nodeType);
    // }
    // console.log("Type: ", type);

    let name;
    /*
    for (let child of node.body.children) {
      // console.log("child", child);
      let childBinaryOperator: ASTBinaryOperator = child as ASTBinaryOperator;
      name = (childBinaryOperator.left as IASTWithName)?.name;
      if (!name) {
        ({name} = child as IASTWithName); // TODO: ¿Esto es necesario?
      }

      if (typeof this.interpreter.globalScope[name] != "undefined") {
        throw new Error(`Variable ${name} already declared.`);
      }

      // Declaration...
      this.interpreter.globalScope[name] = null;

      // Maybe initialization...
      // child.accept(this.interpreter);
      this.interpreter.visit(child);
    }
    */

    return {
      value: name ? this.engine.globalScope[name] : undefined,
      // output: undefined,
    };
  }
}
