import {ConstDecl} from "../ASTNodes/ConstDecl";
import {ASTVisitor} from "../ASTVisitor";



export class ConstDeclVisitor extends ASTVisitor {
  visit(node: ConstDecl) {
    console.log("ConstDeclVisitor", node);
  }
}
