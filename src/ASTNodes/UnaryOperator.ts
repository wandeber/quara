import {Node, INode, INodeWithToken} from "./ASTNode";
import {Token} from "../Token";





export class UnaryOperator extends Node implements INodeWithToken {
  token: Token;

  constructor(
    public operator: Token,
    public expr: INode,
  ) {
    super();
    this.token = operator;
  }

  toString() {
    return String(this.operator.value +""+ this.expr);
  }
}
