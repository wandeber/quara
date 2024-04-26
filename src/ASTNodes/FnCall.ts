import {Node, INode} from "./ASTNode";





export class FnCall extends Node {
  constructor(
    public left: INode, // member
    public right: INode[], // params
  ) {
    super();
  }

  toString() {
    return String(this.left + "(" + this.right.join(", ") + ")");
  }
}
