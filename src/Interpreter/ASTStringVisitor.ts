import ASTString from "../ASTNodes/ASTString";
import ASTVisitor from "./ASTVisitor";



export default class ASTStringVisitor extends ASTVisitor {
  visit(node: ASTString) {
    return node.value;
  }
}
