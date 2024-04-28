import {Assign} from "../ASTNodes/Assign";
import {ASTVisitor} from "../ASTVisitor";



export class AssignVisitor extends ASTVisitor {
  visit(node: Assign) {
    console.log("AssignVisitor", node);
  }
}
