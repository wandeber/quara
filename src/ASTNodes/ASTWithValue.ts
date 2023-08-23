import AST, {IASTWithValue} from "./AST";
import Token from "../Token";



export default abstract class ASTWithValue extends AST implements IASTWithValue {
  value: string|number|boolean;

  constructor(public token: Token) {
    super();
    this.value = token.value;
  }
}
