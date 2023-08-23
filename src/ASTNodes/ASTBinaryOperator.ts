import AST, {IASTWithToken} from "./AST";
import ASTVisitor from "./ASTVisitor";
import Token from "../Token";





export default class ASTBinaryOperator extends AST implements IASTWithToken {
  token: Token;

  constructor(public left: any, public operator: Token, public right: any) {
    super();
    this.left = left;
    this.token = operator;
    this.right = right;
  }


  
  visit(nodeVisitor: ASTVisitor) {
    return nodeVisitor.visitASTBinaryOperator(this);
  }
}
