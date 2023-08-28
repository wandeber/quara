import AST, {IAST, IASTWithToken} from "./AST";
import Token from "../Token";
import ASTCompound from "./ASTCompound";





export default class ASTWhile extends AST implements IASTWithToken {
  constructor(
    public token: Token,
    public condition: IAST,
    public body?: IAST|ASTCompound,
  ) {
    super();
  }

  toString() {
    return String("while");
  }
}
