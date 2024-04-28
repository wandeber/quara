import {ASTVisitor} from "../ASTVisitor";



export class CharVisitor extends ASTVisitor {
  visit(node: Boolean) {
    console.log("CharVisitor", node);
  }
}
