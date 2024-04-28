import {Arr} from "../ASTNodes/Arr";
import {ASTVisitor} from "../ASTVisitor";



export class ArrVisitor extends ASTVisitor {
  visit(node: Arr) {
    console.log("ArrVisitor", node);
  }
}
