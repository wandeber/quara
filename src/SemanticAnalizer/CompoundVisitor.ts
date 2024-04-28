import {Compound} from "../ASTNodes/Compound";
import {ASTVisitor} from "../ASTVisitor";



export class CompoundVisitor extends ASTVisitor {
  visit(node: Compound) {
    console.log("CompoundVisitor", node);
    for (let child of node.children) {
      this.engine.visit(child);
    }
  }
}
