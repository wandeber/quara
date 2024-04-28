import {Obj} from "../ASTNodes/Obj";
import {ASTVisitor} from "../ASTVisitor";



export class ObjVisitor extends ASTVisitor {
  visit(node: Obj) {
    console.log("ObjVisitor", node);
  }
}
