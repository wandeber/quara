import AST, {IAST, IASTWithName, IASTWithToken} from "./AST";
import Token from "../Token";
import ASTCompound from "./ASTCompound";





export default class ASTIf extends AST implements IASTWithToken {
  constructor(
    public token: Token,
    public condition: IAST|IASTWithName,
    public ifTrue: IAST|ASTCompound,
    public ifFalse?: IAST|ASTIf|ASTCompound,
  ) {
    super();
  }

  toString() {
    return String("if");
  }
}
