import AST, {IASTNode} from "./AST";





export default class ASTFunctionCall extends AST {
  constructor(
    public left: IASTNode, // member
    public right: IASTNode[], // params
  ) {
    super();
  }

  toString() {
    return String(this.left + "(" + this.right.join(", ") + ")");
  }
}
