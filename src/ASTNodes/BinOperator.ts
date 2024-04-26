import {Node, INode, INodeWithName, INodeWithToken} from "./ASTNode";
import {Token} from "../Token";





export class BinOperator extends Node implements INodeWithToken {
  token: Token;

  constructor(
    public left: INode|INodeWithName,
    public operator: Token,
    public right: INode|INodeWithName,
  ) {
    super();
    this.token = operator;
  }

  toString() {
    return String(this.left + " " + this.operator.value + " " + this.right);
  }
}
