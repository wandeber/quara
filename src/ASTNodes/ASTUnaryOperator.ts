import AST, {IAST, IASTWithToken} from "./AST";
import Token from "../Token";





export default class ASTUnaryOperator extends AST implements IASTWithToken {
  token: Token;

  constructor(
    public operator: Token,
    public expr: IAST,
  ) {
    super();
    this.token = operator;
  }

  toString() {
    return String(this.operator.value +""+ this.expr);
  }
}
