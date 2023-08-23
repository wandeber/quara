import AST, {IASTWithToken} from "./AST";
import ASTVisitor from "./ASTVisitor";
import Token from "../Token";





export default class ASTFunctionCall extends AST {
  constructor(public left: any, public right: any) {
    super();
    this.left = left; // member
    this.right = right; // params
  }


  
  visit(nodeVisitor: ASTVisitor) {
    return nodeVisitor.visitASTFunctionCall(this as ASTFunctionCall);
  }
}
