import ASTNumber from "../ASTNodes/ASTNumber";
import ASTVisitor from "./ASTVisitor";



export default class ASTNumberVisitor extends ASTVisitor {
  visit(node: ASTNumber) {
    let {value} = node;
    if (value === -0) {
      value = 0;
    }
    return value;
  }
}
