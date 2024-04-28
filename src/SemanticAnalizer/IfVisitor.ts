import {If} from "../ASTNodes/If";
import {ASTVisitor} from "../ASTVisitor";



export class IfVisitor extends ASTVisitor {
  visit(node: If) {
    console.log("IfVisitor", node);
  }
}
