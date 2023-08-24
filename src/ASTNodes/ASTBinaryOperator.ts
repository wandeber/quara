import AST, {IASTNode, IASTWithName, IASTWithToken} from "./AST";
import Token from "../Token";





export default class ASTBinaryOperator extends AST implements IASTWithToken {
  token: Token;

  constructor(
    public left: IASTNode|IASTWithName,
    public operator: Token,
    public right: IASTNode|IASTWithName,
  ) {
    super();
    this.left = left;
    this.token = operator;
    this.right = right;
  }
}
