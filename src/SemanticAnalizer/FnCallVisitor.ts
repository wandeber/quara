import {FnCall} from "../ASTNodes/FnCall";
import {ASTVisitor} from "../ASTVisitor";



export class FnCallVisitor extends ASTVisitor {
  visit(node: FnCall) {
    console.log("FnCallVisitor", node);
  }
}
