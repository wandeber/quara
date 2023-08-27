import ASTNumber from "../ASTNodes/ASTNumber";
import ASTVisitor from "./ASTVisitor";



export default class ASTNumberVisitor extends ASTVisitor {
  visit(node: ASTNumber) {
    let {value} = node;
    return value;
  }
}
