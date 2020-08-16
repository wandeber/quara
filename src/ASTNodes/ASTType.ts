import AST, {ASTWithValue} from "./AST";
import Token from "../Token";





export default class ASTType extends AST implements ASTWithValue {
  value: string|number|boolean;

  constructor(public token: Token) {
    super();
    this.value = token.value;
  }
}
