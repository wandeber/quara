import {Type} from "../ASTNodes/Type";
import {ASTVisitor} from "../ASTVisitor";



export class TypeVisitor extends ASTVisitor {
  visit(node: Type) {
    console.log("TypeVisitor", node);
  }
}
