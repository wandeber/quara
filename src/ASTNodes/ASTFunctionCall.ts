import AST, {IAST} from "./AST";





export default class ASTFunctionCall extends AST {
  constructor(
    public left: IAST, // member
    public right: IAST[], // params
  ) {
    super();
  }

  toString() {
    return String(this.left + "(" + this.right.join(", ") + ")");
  }
}
