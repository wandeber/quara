import {Return} from "../ASTNodes/Return";
import {ASTVisitor} from "../ASTVisitor";



export class ReturnVisitor extends ASTVisitor {
  visit(node: Return) {
    console.log("ReturnVisitor", node);
  }
}
