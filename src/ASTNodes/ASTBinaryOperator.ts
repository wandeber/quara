import AST, {IAST, IASTWithName, IASTWithToken} from "./AST";
import Token from "../Token";





export default class ASTBinaryOperator extends AST implements IASTWithToken {
  token: Token;

  constructor(
    public left: IAST|IASTWithName,
    public operator: Token,
    public right: IAST|IASTWithName,
  ) {
    super();
    this.token = operator;
  }

  toString() {
    return String(this.left + " " + this.operator.value + " " + this.right);
  }
}
