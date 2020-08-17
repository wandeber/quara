import AST, {ASTWithToken} from "./AST";
import Token from "../Token";





export default class ASTUnaryOperator extends AST implements ASTWithToken {
  token: Token;

  constructor(public operator: Token, public expr: any) {
    super();
    this.token = operator;
  }
}