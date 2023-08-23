import AST, {IASTWithToken} from "./AST";
import ASTVisitor from "./ASTVisitor";
import Token from "../Token";





export default class ASTUnaryOperator extends AST implements IASTWithToken {
  token: Token;

  constructor(public operator: Token, public expr: any) {
    super();
    this.token = operator;
  }



  visit(nodeVisitor: ASTVisitor) {
    return nodeVisitor.visitASTUnaryOperator(this);
  }
}
