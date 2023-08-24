import AST, {IASTNode, IASTWithToken} from "./AST";
import Token from "../Token";





export default class ASTUnaryOperator extends AST implements IASTWithToken {
  token: Token;

  constructor(public operator: Token, public expr: IASTNode) {
    super();
    this.token = operator;
  }
}
