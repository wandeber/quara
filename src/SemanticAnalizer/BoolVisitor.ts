import {ASTVisitor} from "../ASTVisitor";



export class BoolVisitor extends ASTVisitor {
  visit(node: Boolean) {
    console.log("BoolVisitor", node);
  }
}
