import AST, {ASTWithName} from "./AST";
import Token from "../Token";





export default class ASTVariable extends AST implements ASTWithName {
  name: string;

  constructor(public token: Token) {
    super();
    this.name = token.value as string; // Change by this.value?
  }
}
