import ASTChar from "../ASTNodes/ASTChar";
import ASTVisitor from "./ASTVisitor";



export default class ASTCharVisitor extends ASTVisitor {
  visit(node: ASTChar) {
    return node.value;
  }
}
