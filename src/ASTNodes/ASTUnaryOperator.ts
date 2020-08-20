import AST, {ASTWithToken} from "./AST";
import ASTVisitor from "./ASTVisitor";
import Token from "../Token";





export interface ASTUnaryOperatorVisitor extends ASTVisitor {
  visitASTUnaryOperator(node: ASTUnaryOperator): any;
}

export default class ASTUnaryOperator extends AST implements ASTWithToken {
  token: Token;

  constructor(public operator: Token, public expr: any) {
    super();
    this.token = operator;
  }



  visit(nodeVisitor: ASTUnaryOperatorVisitor) {
    return nodeVisitor.visitASTUnaryOperator(this);
  }
}
