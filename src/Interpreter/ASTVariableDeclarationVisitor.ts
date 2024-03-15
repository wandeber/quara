import ASTBinaryOperator from "../ASTNodes/ASTBinaryOperator";
import ASTVariableDeclaration from "../ASTNodes/ASTVariableDeclaration";
import ASTVisitor from "./ASTVisitor";
import {IASTWithName} from "../ASTNodes/AST";



export default class ASTVariableDeclarationVisitor extends ASTVisitor {
  visit(node: ASTVariableDeclaration) {
    // let type = "any"; // Default any or deduce from value?
    // if (node.nodeType) {
    //   type = this.interpreter.visit(node.nodeType);
    // }
    // console.log("Type: ", type);

    let name;
    for (let child of node.children) {
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

    return {
      value: name ? this.interpreter.globalScope[name] : undefined,
      // output: undefined,
    };
  }
}
