import AST, {ASTWithToken} from "./AST";
import ASTVisitor from "./ASTVisitor";
import Token from "../Token";





export interface ASTBinaryOperatorVisitor extends ASTVisitor {
  visitASTBinaryOperator(node: ASTBinaryOperator): any;
}

export default class ASTBinaryOperator extends AST implements ASTWithToken {
  token: Token;

  constructor(public left: any, public operator: Token, public right: any) {
    super();
    this.left = left;
    this.token = operator;
    this.right = right;
  }


  
  visit(nodeVisitor: ASTBinaryOperatorVisitor) {
    return nodeVisitor.visitASTBinaryOperator(this);
  }
}
