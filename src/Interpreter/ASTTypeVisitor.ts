import ASTType from "../ASTNodes/ASTType";
import ASTVisitor from "./ASTVisitor";



export default class ASTTypeVisitor extends ASTVisitor {
  visit(node: ASTType) {
    return node.value;
  }
}
