import ASTCompound from "../ASTNodes/ASTCompound";
import ASTVisitor from "./ASTVisitor";



export default class ASTCompoundVisitor extends ASTVisitor {
  visit(node: ASTCompound) {
    let result: any = [];
    for (let child of node.children) {
      // result.push(child.accept(this.interpreter));
      result.push(this.interpreter.visit(child));
    }
    if (result.length > 0) {
      result = result[result.length - 1];
    }
    return result;
  }
}
