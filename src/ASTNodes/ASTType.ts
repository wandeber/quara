import AST from "./AST";
import Token from "../Token";



export default class ASTType extends AST {
  value: string;

  constructor(public token: Token) {
    super();
    this.value = String(token.value);
  }

  toString() {
    return String(this.value);
  }
}
