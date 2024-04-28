import {Str} from "../ASTNodes/Str";
import {ASTVisitor} from "../ASTVisitor";



export class TxtBlockVisitor extends ASTVisitor {
  visit(node: Str) {
    console.log("TxtBlockVisitor", node);
  }
}
