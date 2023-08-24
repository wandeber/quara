import ASTCompound from "../ASTNodes/ASTCompound";
import ASTVisitor from "./ASTVisitor";



export default class ASTCompoundVisitor extends ASTVisitor {
  visit(node: ASTCompound) {
    let result: any = [];
    for (let child of node.children) {
      result.push(child.visit(this.interpreter));
    }
    if (result.length > 0) {
      result = result[result.length - 1];
    }
    return result;
  }
}
