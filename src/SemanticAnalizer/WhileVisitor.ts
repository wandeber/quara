import {While} from "../ASTNodes/While";
import {ASTVisitor} from "../ASTVisitor";



export class WhileVisitor extends ASTVisitor {
  visit(node: While) {
    console.log("WhileVisitor", node);
  }
}
