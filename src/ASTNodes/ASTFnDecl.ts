import Token from "../Token";
import AST from "./AST";
import ASTCompound from "./ASTCompound";
import ASTVariable from "./ASTVariable";





export default class ASTFnDecl extends AST {
  constructor(
    public token: Token,
    public name: ASTVariable,
    public params: AST[],
    public body: ASTCompound,
  ) {
    super();
  }

  toString() {
    return String("fn "+ this.name +"("+ this.params.join(", ") +")");
  }
}
