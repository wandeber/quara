import {BinOperator} from "../ASTNodes/BinOperator";
import {VarDecl} from "../ASTNodes/VarDecl";
import {ASTVisitor} from "./ASTVisitor";
import {INodeWithName} from "../ASTNodes/ASTNode";



export class VarDeclVisitor extends ASTVisitor {
  visit(node: VarDecl) {
    // let type = "any"; // Default any or deduce from value?
    // if (node.nodeType) {
    //   type = this.interpreter.visit(node.nodeType);
    // }
    // console.log("Type: ", type);

    let name;
    for (let child of node.children) {
      // console.log("child", child);
      let childBinaryOperator: BinOperator = child as BinOperator;
      name = (childBinaryOperator.left as INodeWithName)?.name;
      if (!name) {
        ({name} = child as INodeWithName); // TODO: ¿Esto es necesario?
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

    return {
      value: name ? this.interpreter.globalScope[name] : undefined,
      // output: undefined,
    };
  }
}
