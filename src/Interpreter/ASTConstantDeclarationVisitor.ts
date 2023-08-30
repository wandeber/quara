import ASTConstantDeclaration from "../ASTNodes/ASTConstantDeclaration";
import ASTVisitor from "./ASTVisitor";
import ASTBinaryOperator from "../ASTNodes/ASTBinaryOperator";
import {IASTWithName} from "../ASTNodes/AST";
import {IVisitorResult} from "./VisitorResult";



export default class ASTConstantDeclarationVisitor extends ASTVisitor {
  visit(node: ASTConstantDeclaration): IVisitorResult {
    // this.interpreter.debug("visitASTConstantDeclaration");
    // let type = "any"; // Const puede ser any? Que sea como no ponerlo?
    // if (node.nodeType) {
    //   type = this.interpreter.visit(node.nodeType);
    // }
    // console.log("Type: ", type);

    let name;
    for (let child of node.children) {
      // console.log("child", child);
      let childBinaryOperator: ASTBinaryOperator = child as ASTBinaryOperator;
      name = (childBinaryOperator.left as IASTWithName).name;

      if (typeof this.interpreter.globalScope[name] != "undefined") {
        throw new Error(`Constant ${name} already declared.`);
      }

      // Declaration...
      this.interpreter.globalScope[name] = null;

      // Maybe initialization...
      // child.accept(this.interpreter);
      this.interpreter.visit(child);
    }

    return {
      value: this.interpreter.globalScope[name],
      output: this.interpreter.globalScope[name],
    };
  }
}
