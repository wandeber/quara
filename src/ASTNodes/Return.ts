import {Node, INode} from "./ASTNode";





export class Return extends Node {
  constructor(
    public expr: INode,
  ) {
    super();
  }

  toString() {
    return String("return "+ this.expr);
  }
}
