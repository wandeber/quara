import ASTConstDecl from "../ASTNodes/ASTConstDecl";
import ASTVisitor from "./ASTVisitor";
import ASTBinaryOperator from "../ASTNodes/ASTBinaryOperator";
import {IASTWithName} from "../ASTNodes/AST";
import {IVisitorResult} from "./VisitorResult";



export default class ASTConstDeclVisitor extends ASTVisitor {
  visit(node: ASTConstDecl): IVisitorResult {
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

    let value = name ? this.interpreter.globalScope[name] : undefined;
    return {
      value,
      output: value,
    };
  }
}
