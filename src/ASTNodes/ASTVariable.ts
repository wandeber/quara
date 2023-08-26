import AST, {IASTWithName} from "./AST";
import Token from "../Token";





export default class ASTVariable extends AST implements IASTWithName {
  name: string;

  constructor(public token: Token) {
    super();
    this.name = token.value as string; // Change by this.value?
  }

  toString() {
    return String(this.name);
  }
}
