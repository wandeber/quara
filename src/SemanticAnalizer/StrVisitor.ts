import {Str} from "../ASTNodes/Str";
import {ASTVisitor} from "../ASTVisitor";



export class StrVisitor extends ASTVisitor {
  visit(node: Str) {
    console.log("StrVisitor", node);
  }
}
