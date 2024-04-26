import {ConstDecl} from "../ASTNodes/ConstDecl";
import {ASTVisitor} from "./ASTVisitor";
import {BinOperator} from "../ASTNodes/BinOperator";
import {INodeWithName} from "../ASTNodes/ASTNode";
import {IVisitorResult} from "./VisitorResult";



export class ConstDeclVisitor extends ASTVisitor {
  visit(node: ConstDecl): IVisitorResult {
    // this.interpreter.debug("visitASTConstantDeclaration");
    // let type = "any"; // Const puede ser any? Que sea como no ponerlo?
    // if (node.nodeType) {
    //   type = this.interpreter.visit(node.nodeType);
    // }
    // console.log("Type: ", type);

    let name;
    for (let child of node.children) {
      // console.log("child", child);
      let childBinaryOperator: BinOperator = child as BinOperator;
      name = (childBinaryOperator.left as INodeWithName).name;

      if (typeof this.interpreter.globalScope[name] != "undefined") {
        throw new Error(`Constant ${name} already declared.`);
      }

      // Declaration...
      this.interpreter.globalScope[name] = null;

      // Maybe initialization...
      // child.accept(this.interpreter);
      this.interpreter.visit(child);
    }

    let value = name ? this.interpreter.globalScope[name] : undefined;
    return {
      value,
      output: value,
    };
  }
}
