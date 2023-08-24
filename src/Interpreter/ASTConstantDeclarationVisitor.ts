import ASTConstantDeclaration from "../ASTNodes/ASTConstantDeclaration";
import ASTVisitor from "./ASTVisitor";
import ASTBinaryOperator from "../ASTNodes/ASTBinaryOperator";
import {IASTWithName} from "../ASTNodes/AST";



export default class ASTConstantDeclarationVisitor extends ASTVisitor {
  visit(node: ASTConstantDeclaration) {
    this.interpreter.debug("visitASTConstantDeclaration");
    // let type = "any"; // Const puede ser any? Que sea como no ponerlo?
    // if (node.nodeType) {
    //   type = this.interpreter.visit(node.nodeType);
    // }
    // console.log("Type: ", type);

    let name;
    for (let child of node.children) {
      // console.log("child", child);
      let childBinaryOperator: ASTBinaryOperator = child as ASTBinaryOperator;
      if (childBinaryOperator.left && childBinaryOperator.left.name) {
        ({name} = childBinaryOperator.left);
      }
      else {
        ({name} = child as IASTWithName); // TODO: ¿Esto es necesario?
      }

      if (typeof this.interpreter.globalScope[name] != "undefined") {
        throw new Error(`Variable ${name} already declared.`);
      }

      // Declaration...
      this.interpreter.globalScope[name] = null;

      // Maybe initialization...
      child.visit(this.interpreter);
    }

    return this.interpreter.globalScope[name];
  }
}
