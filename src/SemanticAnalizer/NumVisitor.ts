import {ASTVisitor} from "../ASTVisitor";
import {Num} from "../ASTNodes/Num";



export class NumVisitor extends ASTVisitor {
  visit(node: Num) {
    console.log("NumVisitor", node);
  }
}
